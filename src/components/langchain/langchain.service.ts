import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/config/environment.schema';
import { PromptTemplate } from 'langchain/prompts';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BaseCallbackHandler } from 'langchain/callbacks';
import {
  Configuration,
  OpenAIApi,
  CreateCompletionRequest,
  ListModelsResponse,
  CreateCompletionResponse,
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
  ChatCompletionRequestMessage,
  ChatCompletionFunctions,
} from 'openai';
import { EvaluationConfig } from '../user/model/evaluationConfig.schema';
import { PitchEvaluation } from '../pitch/model/pitch.schema';

type DetailedSection = {
  LetterGrade: string;
  Evaluation: string;
  Recommendations: string;
};

type ModelType = {
  modelName: string;
  IsInputAPitch: string;
  FeaturesAndBenefits: DetailedSection;
  Readiness: DetailedSection;
  BarrierToEntry: DetailedSection;
  Adoption: DetailedSection;
  SupplyChain: DetailedSection;
  MarketSize: DetailedSection;
  EntrepreneurExperience: DetailedSection;
  FinancialExpectations: DetailedSection;
};

const textMapping = {
  FeaturesAndBenefits: 'features and benefits',
  Readiness: 'readiness aspect',
  BarrierToEntry: 'barrier to entry',
  Adoption: 'adoption',
  SupplyChain: 'supply chainany',
  MarketSize: 'market size',
  EntrepreneurExperience: 'entrepreneur experience',
  FinancialExpectations: 'financial expectations',
};
@Injectable()
export class LangchainService {
  private readonly openAiApi: OpenAIApi;
  openAIApiKey: string;
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    this.openAIApiKey = this.configService.get('OPENAI_API_KEY');

    const configuration = new Configuration({
      apiKey: this.openAIApiKey,
    });

    this.openAiApi = new OpenAIApi(configuration);
  }

  async callOpenAI(
    messages: ChatCompletionRequestMessage[],
    functions: ChatCompletionFunctions[],
    usageArray: any[],

    modelName = 'gpt-3.5-turbo-16k-0613',
    max_tokens = 3000,
    key?: string,
    temperature = 0,
  ): Promise<any> {
    const params: CreateChatCompletionRequest = {
      model: modelName,
      messages,
      functions,
      function_call: 'auto',
      temperature,
      max_tokens,
    };

    let lastError;
    const maxRetries = 3;

    for (let i = 0; i < maxRetries; i++) {
      try {
        const completion = await this.openAiApi.createChatCompletion(params);

        if (completion.data.choices[0].message.function_call === undefined) {
          return {
            content: completion.data.choices[0].message.content,
            data: completion.data,
            key,
          };
        } else {
          let jsonString =
            completion.data.choices[0].message.function_call.arguments;

          // Attempt to remove a trailing comma from the JSON string
          jsonString = jsonString
            .replace(/,\s*}$/, '}')
            .replace(/\n/g, '')
            .replace(/\r/g, '');

          // Attempt to parse the JSON string
          let functionCallResult;
          try {
            functionCallResult = JSON.parse(jsonString);
          } catch (error) {
            console.error(
              'Error parsing JSON:',
              error,
              '\nJSON String:',
              jsonString,
            );
            throw error;
          }

          const functionCallName =
            completion.data.choices[0].message.function_call.name;

          usageArray.push({
            name: functionCallName,
            modelName,
            ...completion.data.usage,
          });

          return {
            functionCallResult,
            functionCallName,
            data: completion.data,
            key,
          };
        }
      } catch (error) {
        lastError = error;
        console.error(`Attempt ${i + 1} failed. Retrying...`);
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, i) * 1000),
        ); // Exponential backoff
      }
    }

    console.error('Max retries reached. Throwing last error.');
    throw lastError;
  }

  async callGetLetterGrade(
    actualResult: any,
    finalResult: any,
    evaluationJson: any,
    tokenUsageArray: any,
    pitchText: string,
  ) {
    const key = actualResult.key;

    const letterGradePrompt = evaluationJson[key].LetterGrade;
    const promptMessage: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content:
          'Only use the functions you have been provided with and follow the format strictly.',
      },
      {
        role: 'user',
        content:
          'Your job is to act as an early stage startup investor. You are supposed to listen to a startup pitch and analyze it and give it a letter grade based on instructions you will receive' +
          'Here is the startup pitch - ' +
          '\n' +
          pitchText +
          '\n' +
          'Here is your verbal evaluation - ' +
          '\n' +
          actualResult.functionCallResult.Evaluation +
          '\n' +
          'Your grading should be based on the following criteria:' +
          '\n' +
          letterGradePrompt,
      },
    ];

    const functionSchema = [
      {
        name: `${key}-letterGrade`,
        description: `Assign a letter grade`,
        parameters: {
          type: 'object',
          properties: {
            Lettergrade: {
              type: 'string',
              description: letterGradePrompt,
            },
          },
          required: ['Lettergrade'],
          // required: ['Evaluation', 'Recommendations'],
        },
      },
    ];

    return this.callOpenAI(
      promptMessage,
      functionSchema,
      tokenUsageArray,
      'gpt-3.5-turbo-16k-0613',
      3000,
      key,
      0,
    ).then((result) => {
      // should be
      //   functionCallResult,
      //   functionCallName,
      //   data: completion.data,
      //   key,
      // console.log(result.functionCallResult);
      finalResult[key].LetterGrade = result.functionCallResult.Lettergrade;
    });
  }

  async callGetRecommendation(
    actualResult: any,
    finalResult: any,
    evaluationJson: any,
    tokenUsageArray: any,
    pitchText: string,
  ) {
    const key = actualResult.key;

    // Extracting the recommendation prompt from your JSON, similar to how you've extracted the LetterGrade prompt
    const recommendationPrompt = evaluationJson[key].Recommendations;

    // Constructing the message prompt
    const promptMessage: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content:
          'Only use the functions you have been provided with and follow the format strictly.',
      },
      {
        role: 'user',
        content:
          'Your job is to listen to a startup pitch and analyze it to provide recommendations based on instructions you will receive. Here is the startup pitch - ' +
          '\n' +
          pitchText +
          '\n' +
          'Here is your verbal evaluation - ' +
          '\n' +
          actualResult.functionCallResult.Evaluation +
          '\n' +
          'Your evaluation should be based on the following criteria' +
          '\n' +
          recommendationPrompt,
      },
    ];

    // Defining the schema for this function
    const functionSchema = [
      {
        name: `${key}-recommendation`,
        description: `Provide a recommendation based on the Evaluation.`,
        parameters: {
          type: 'object',
          properties: {
            Recommendations: {
              type: 'string',
              description: recommendationPrompt,
            },
          },
          required: ['Recommendations'],
        },
      },
    ];

    // Making the API call, similar to the previous method
    return this.callOpenAI(
      promptMessage,
      functionSchema,
      tokenUsageArray,
      'gpt-3.5-turbo-16k-0613',
      3000,
      key,
      0,
    ).then((result) => {
      // Storing the recommendation in the final result object
      finalResult[key].Recommendations =
        result.functionCallResult.Recommendations;
    });
  }
  calculateCost(tokenUsageArray: any) {
    const prices = {
      'gpt-3.5-turbo': { prompt: 0.0015, completion: 0.002 },
      'gpt-3.5-turbo-16k-0613': { prompt: 0.003, completion: 0.004 },
    };

    let totalPromptCost = 0;
    let totalCompletionCost = 0;

    tokenUsageArray.forEach((item: any) => {
      const promptCost =
        (item.prompt_tokens / 1000) * prices[item.modelName].prompt;
      const completionCost =
        (item.completion_tokens / 1000) * prices[item.modelName].completion;

      totalPromptCost += promptCost;
      totalCompletionCost += completionCost;
    });

    return {
      totalPromptCost,
      totalCompletionCost,
      totalCost: totalPromptCost + totalCompletionCost,
    };
  }
  async evaluatePitchWithOpenAI(
    evaluationConfig: EvaluationConfig,
    pitchText: string,
  ) {
    // console.log(evaluationJson);
    console.time('awaiting results'); // Start the timer

    const {
      IsInputAPitch,
      FeatureBenefits,
      Readiness,
      BarrierToEntry,
      Adoption,
      SupplyChain,
      MarketSize,
      EntrepreneurExperience,
      FinancialExpectations,
    } = evaluationConfig;
    const tokenUsageArray = [];

    // const prePrompts = [IsInputAPitch];
    const mainPrompts = {
      FeatureBenefits,
      Readiness,
      BarrierToEntry,
      Adoption,
      SupplyChain,
      MarketSize,
      EntrepreneurExperience,
      FinancialExpectations,
    };
    const postPrompts = {};
    const prePromptPromises = {};

    // checking if its a pitch

    const isPitchFunctionSchema = [
      {
        name: 'isInputAPitch',
        description: `Evaluate the text to determine if it qualifies the evaluation parameters. Respond only with "true" if it meets all criteria or "false" otherwise.`,
        parameters: {
          type: 'object',
          properties: {
            ValidBoolean: {
              type: 'boolean',
              description:
                'For the following text, return True if it is describing a business or a startup idea, Return False if not',
            },
          },
          required: ['ValidBoolean'],
        },
      },
    ];

    const message: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content:
          'Evaluate the following text and Return True if it contains information about a company, startup, or an idea. It should contain information such as a new solution for an existing market problem and a business model. Return False if the text is talking about anything else. Only use the functions you have been provided with and follow the format strictly.',
      },
      {
        role: 'user',
        content:
          'Evaluate the following text and Return True if it contains information about a company, startup, or an idea. It should contain information such as a new solution for an existing market problem and a business model. Return False if the text is talking about anything else. Return False if the text is just dummy text, or a copypaste repetition without real content, such as This is a pitch. Here is the text: ' +
          '\n' +
          pitchText,
      },
    ];

    const isInputAPitchCompletion = await this.callOpenAI(
      message,
      isPitchFunctionSchema,
      tokenUsageArray,
      'gpt-3.5-turbo-16k-0613',
    );

    if (!isInputAPitchCompletion.functionCallResult.ValidBoolean) {
      throw new BadRequestException(' Input is not a pitch...');
    }

    // return isInputAPitchCompletion;

    const chains = [];
    // // loop thru each main prompt and apply it to the pitch
    for (const [key, value] of Object.entries(mainPrompts)) {
      const {
        LetterGrade,
        Evaluation,
        Recommendations,
        temperature,
        maxTokens,
      } = value;
      const topic = textMapping[key];

      // Evaluation prompt message
      const promptMessageEvaluation: ChatCompletionRequestMessage[] = [
        {
          role: 'system',
          content:
            'Only use the functions you have been provided with and follow the format strictly.',
        },
        {
          role: 'user',
          content:
            'Here is the startup pitch' +
            '\n' +
            pitchText +
            '\n' +
            'Your evaluation should be based on the following criteria' +
            '\n' +
            Evaluation,
        },
      ];

      const functionSchemaEvaluation = [
        {
          name: key,
          description: `Get the pitch evaluation on the topic of ${topic}.`,
          parameters: {
            type: 'object',
            properties: {
              Evaluation: {
                type: 'string',
                description: Evaluation,
              },
            },
            required: ['Evaluation'],
          },
        },
      ];

      // Call OpenAI separately for Evaluation and Recommendations
      const functionChatCompletionEvaluation = this.callOpenAI(
        promptMessageEvaluation,
        functionSchemaEvaluation, // Assuming the schema stays the same for both calls; modify if needed
        tokenUsageArray,
        'gpt-3.5-turbo-16k-0613',
        maxTokens,
        key, // Append "-evaluation" to key to distinguish in results
        temperature,
      );

      // Push both promises to the `chains` array
      chains.push(functionChatCompletionEvaluation);
    }
    // take out the results only from the chain array
    // const results = chains.map((runObject) => runObject.chainResult);
    // await results:
    const settledResults = await Promise.allSettled(chains);

    console.timeEnd('awaiting results'); // End the timer and log the total time
    console.log('Returning');
    console.log(tokenUsageArray);
    const finalResult = {};
    const letterGradeEvaluations = [];
    const recommendationEvaluations = [];
    settledResults.forEach((runObject, index) => {
      // console.log(runObject.description);

      const currentResult = settledResults[index];

      if (currentResult.status === 'fulfilled') {
        // TypeScript now knows that 'value' exists on this object
        const actualResult = currentResult.value;
        // console.log(actualResult.additional_kwargs.function_call.arguments);
        try {
          // console.log({ actualResult });
          if (actualResult.content) {
            finalResult[actualResult.key] = actualResult.content;
          } else {
            // Here, if this code executes it means there was no errors, and we can assign a letter grade.

            finalResult[actualResult.key] = actualResult.functionCallResult;
            letterGradeEvaluations.push(
              this.callGetLetterGrade(
                actualResult,
                finalResult,
                evaluationConfig,
                tokenUsageArray,
                pitchText,
              ),
            );
            recommendationEvaluations.push(
              this.callGetRecommendation(
                actualResult,
                finalResult,
                evaluationConfig,
                tokenUsageArray,
                pitchText,
              ),
            );
          }
          // error here is that 1. sometimes no letter grade, 2. sometimes no comma.
        } catch (error) {
          finalResult[actualResult.key] = 'Error';
        }
      } else {
        console.error(
          'Promise was rejected with reason:',
          currentResult.reason,
        );
      }
    });

    // wait for letterGrades to settle.

    await Promise.allSettled(letterGradeEvaluations);
    await Promise.allSettled(recommendationEvaluations);
    // now need postPrompts to check for lettergrades

    const cost = this.calculateCost(tokenUsageArray);
    return {
      ...finalResult,
      cost,
      // additionalTokenCountInfo: tokenUsageArray,
    } as unknown as PitchEvaluation;
  }
}
