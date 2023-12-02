import { Injectable } from '@nestjs/common';
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
import { AxiosResponse } from 'axios';
import { AiQuestionRequestModel } from './model/ai-question-request';
import { OpenAiConfigService } from '../openAiConfig/openAiConfig.service';
import { ModelName, ResponseMessage } from 'src/core/constants';
import {
  calculatePrice,
  PitchEvaluation,
  removeTrailingComma,
} from 'src/core/functions';
import {
  ErrorWhileAudioTranscriptionException,
  GptException,
  InvalidFileTypeException,
  NotAPitchException,
} from './openAiIntegration.exceptions';
import * as fs from 'fs';
import { Response } from 'express';
import { CreateEvaluationInput } from './dto/create-evaluation.input';
import { FileTypeValidator } from 'src/core/pipes/file-type.validator';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/config/environment.schema';
import { EvaluationService } from '../evaluation/evaluation.service';

const DEFAULT_MODEL_ID = 'text-davinci-003';
const DEFAULT_TEMPERATURE = 0.9;
const DEFAULT_MAX_TOKENS = 2048;
@Injectable()
export class OpenAiIntegrationService {
  private readonly openAiApi: OpenAIApi;

  constructor(
    private readonly openAIConfigService: OpenAiConfigService,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly evaluationService: EvaluationService,
  ) {
    const configuration = new Configuration({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });

    this.openAiApi = new OpenAIApi(configuration);
  }

  async getModelAnswerFromProvidedSettings(
    model: AiQuestionRequestModel,
  ): Promise<CreateCompletionResponse> {
    try {
      const params: CreateCompletionRequest = {
        prompt: model.question,
        model: model.modelId ?? DEFAULT_MODEL_ID,
        temperature: model.temperature ?? DEFAULT_TEMPERATURE,
        max_tokens: model.maxTokens ?? DEFAULT_MAX_TOKENS,
      };

      const response = await this.openAiApi.createCompletion(params);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Test Chat Completion
  async getChatCompletion(
    message: ChatCompletionRequestMessage[],
  ): Promise<CreateChatCompletionResponse> {
    const params: CreateChatCompletionRequest = {
      model: 'gpt-3.5-turbo-16k',
      messages: message,
      temperature: 0.5,
      max_tokens: 8000,
    };

    const completion = await this.openAiApi.createChatCompletion(params);

    return completion.data;
  }

  private async gptCallWithFunctionCalling(
    message: ChatCompletionRequestMessage[],
    functions: ChatCompletionFunctions[],
  ): Promise<CreateChatCompletionResponse> {
    const config = await this.openAIConfigService.getOpenAiConfigByModel(
      ModelName.Gpt35Turbo16kJune13,
    );
    console.log(config);
    const params: CreateChatCompletionRequest = {
      model: config.modelId,
      messages: message,
      functions,
      function_call: 'auto',
      temperature: 0,
      max_tokens: config.maxTokens,
    };

    try {
      const completion = await this.openAiApi.createChatCompletion(params);

      return completion.data;
    } catch (error) {
      console.log(JSON.stringify(error.response.data, null, 2));
      throw new GptException(JSON.stringify(error.response.data, null, 2));
    }
  }

  async getPitchWithSchema(
    pitch: string,
    evaluationModelName = 'main',
  ): Promise<PitchEvaluation> {
    const message: ChatCompletionRequestMessage[] = [
      { role: 'user', content: pitch },
    ];

    const pitchEvaluationSchema =
      await this.evaluationService.getMainPitchEvaluationSchema(
        evaluationModelName,
      );
    const res = await this.gptCallWithFunctionCalling(
      message,
      pitchEvaluationSchema,
    );

    if (res.usage) {
      console.log(res.usage);
      const cost = calculatePrice(
        ModelName.Gpt35Turbo16kJune13,
        res.usage.prompt_tokens,
        res.usage.completion_tokens,
      );
      console.log('$', cost);
    }

    if (!res.choices[0].message.function_call) {
      throw new NotAPitchException();
    }

    const evaluation: PitchEvaluation = JSON.parse(
      removeTrailingComma(res.choices[0].message.function_call.arguments),
    ) as unknown as PitchEvaluation;

    return evaluation;
  }

  async getPitchEvaluationForAudio(
    CreateEvaluationInput: CreateEvaluationInput,
    pitchFile: Express.Multer.File,
    res: Response,
  ): Promise<void> {
    const isValidFileType = await new FileTypeValidator().validate(pitchFile);

    if (!isValidFileType) {
      throw new InvalidFileTypeException();
    }

    const pitch = await this.transcribePitch(pitchFile);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');

    const stepOneRes = {
      message: ResponseMessage.ConvertedToPitch,
      pitch: pitch,
    };

    res.write(JSON.stringify(stepOneRes));

    const evaluation = await this.getPitchWithSchema(pitch);

    const stepTwoRes = {
      message: ResponseMessage.Evaluated,
      evaluation,
    };

    res.end(JSON.stringify(stepTwoRes));
  }

  async transcribePitch(audio: Express.Multer.File): Promise<string> {
    try {
      const resp = await this.openAiApi.createTranscription(
        fs.createReadStream(audio.path) as unknown as File,
        'whisper-1',
      );
      fs.unlink(audio.path, (error) => {
        console.log(error);
      });
      return resp.data.text;
    } catch (error) {
      fs.unlink(audio.path, (error) => {
        console.log(error);
      });
      throw new ErrorWhileAudioTranscriptionException();
    }
  }

  async listModels(): Promise<ListModelsResponse> {
    try {
      const response: AxiosResponse<ListModelsResponse, any> =
        await this.openAiApi.listModels();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
