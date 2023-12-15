import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  NewPitch,
  Pitch,
  PitchEvaluation as newPitchEvaluation,
} from './model/pitch.schema';
import { OpenAiIntegrationService } from '../openAiIntegration/openAiIntegration.service';
import { pitchModelToOutput } from './pitch.convertor';
import { CloudStorageService } from '../cloudStorage/cloudStorage.service';
import { UserService } from '../user/user.service';
import { LangchainService } from '../langchain/langchain.service';
import {
  EvaluateLCPitchAdminDto,
  EvaluateLCPitchDto,
  PitchResponseDto,
} from './dto/pitchResponse.dto';
import { EvaluationService } from '../evaluation/evaluation.service';
import { PitchEvaluation } from 'src/core/functions';

@Injectable()
export class PitchService {
  isProcessing: boolean;
  constructor(
    @InjectModel(Pitch.name)
    private serviceModel: Model<Pitch>,
    @InjectModel(NewPitch.name)
    private newPitchModel: Model<NewPitch>,
    @InjectModel(newPitchEvaluation.name)
    private pitchEvaluationModel: Model<newPitchEvaluation>,
    private langchainService: LangchainService,
    private openAiIntegrationService: OpenAiIntegrationService,
    private cloudStorageService: CloudStorageService,
    private userService: UserService,
    private evaluationService: EvaluationService,
  ) {}

  async addEvaluation(
    pitchId: string,
    evaluation: newPitchEvaluation,
  ): Promise<NewPitch> {
    // 1. Insert the evaluation into the PitchEvaluation collection
    const evaluationDoc = await this.pitchEvaluationModel.create(evaluation);

    // 2. Push the new evaluationId into the evaluationIds array of the NewPitch document
    return this.newPitchModel
      .findOneAndUpdate(
        { _id: pitchId },
        {
          $push: { evaluationIds: evaluationDoc._id },
          $set: { latestEvaluationId: evaluationDoc._id },
        },
        { new: true }, // returns the updated document
      )
      .exec();
  }

  async savePitchText(
    pitchText: string,
    fileName: string,
    userId: string,
  ): Promise<NewPitch> {
    return this.newPitchModel.create({
      userId,
      pitchText,
      fileName,
    });
  }
  async savePitch(
    pitchText: string,
    pitchEval: PitchEvaluation,
    fileName: string,
    userId: string,
  ): Promise<Pitch> {
    return this.serviceModel.create({
      userId,
      pitchText,
      featureBenefits: {
        letterGrade: pitchEval.LetterGradeFeaturesBenefits,
        evaluation: pitchEval.EvaluationFeaturesBenefits,
        recommendations: pitchEval.RecommendationsFeaturesBenefits,
      },
      readiness: {
        letterGrade: pitchEval.LetterGradeReadiness,
        evaluation: pitchEval.EvaluationReadiness,
        recommendations: pitchEval.RecommendationsReadiness,
      },
      barrierToEntry: {
        letterGrade: pitchEval.LetterBTE,
        evaluation: pitchEval.EvaluationBTE,
        recommendations: pitchEval.RecommendationsBTE,
      },
      adoption: {
        letterGrade: pitchEval.LetterAdoption,
        evaluation: pitchEval.EvaluationAdoption,
        recommendations: pitchEval.RecommendationsAdoption,
      },
      supplyChain: {
        letterGrade: pitchEval.LetterSupplyChain,
        evaluation: pitchEval.EvaluationSupplyChain,
        recommendations: pitchEval.RecommendationsSupplyChain,
      },
      marketSize: {
        letterGrade: pitchEval.LetterMarketSize,
        evaluation: pitchEval.EvaluationMarketSize,
        recommendations: pitchEval.RecommendationsMarketSize,
      },
      entrepreneurExperience: {
        letterGrade: pitchEval.LetterEE,
        evaluation: pitchEval.EvaluationEE,
        recommendations: pitchEval.RecommendationsEE,
      },
      financialExpectations: {
        letterGrade: pitchEval.LetterFE,
        evaluation: pitchEval.EvaluationFE,
        recommendations: pitchEval.RecommendationsFE,
      },
      fileName,
    });
  }

  async getPitchfromEmail(email: string): Promise<Pitch[]> {
    try {
      const userId = await this.getUserId(email);

      if (!userId) {
        throw new Error('User ID not found');
      }

      const pitches = await this.serviceModel.find({ userId: userId }).exec();

      if (pitches.length === 0) {
        throw new Error('Pitches not found');
      }

      return pitches;
    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      throw error;
    }
  }

  async uploadFileToCloudStorage(pitchFile: Express.Multer.File): Promise<any> {
    try {
      const { name: fileNameGCS } =
        await this.cloudStorageService.uploadPitchFile(pitchFile);
      return fileNameGCS;
    } catch (error) {
      console.error('Error uploading file to cloud storage:', error);
      throw new Error('Failed to upload file to cloud storage');
    }
  }

  async transcribePitch(pitchFile: Express.Multer.File) {
    try {
      const pitchText = await this.openAiIntegrationService.transcribePitch(
        pitchFile,
      );
      return pitchText;
    } catch (error) {
      console.error('An error occurred while transcribing the pitch:', error);
      // Handle the error as you see fit. For example, you could throw it again,
      // return a default value, or return a custom error message.
      throw new Error('Failed to transcribe the pitch');
    }
  }

  async mapPitchTextToDto(
    pitchText: string,
    email: string,
    modelName: string,
  ): Promise<EvaluateLCPitchAdminDto> {
    return {
      email: email,
      pitchText: pitchText,
      modelName: modelName,
    } as EvaluateLCPitchAdminDto;
  }

  async EvaluatePitch(
    pitchText: string,
    modelName = 'main',
  ): Promise<PitchEvaluation> {
    const evaluation = await this.openAiIntegrationService.getPitchWithSchema(
      pitchText,
      modelName,
    );
    return evaluation;
  }

  convertPitchToOutput(pitch: Pitch) {
    return pitchModelToOutput(pitch);
  }
  async getUserId(email: string): Promise<string> {
    const user = await this.userService.findOneOrNull({ email });
    if (user) {
      return String(user._id);
    }

    const createdUser = await this.userService.createUser(email);

    return String(createdUser._id);
  }

  async evaluateLangechainPitch(
    evaluatePitchDto: EvaluateLCPitchDto | EvaluateLCPitchAdminDto,
  ): Promise<any> {
    try {
      while (this.isProcessing) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      this.isProcessing = true;

      // Your existing logic here
      const result = await this.actuallyEvaluateLangechainPitch(
        evaluatePitchDto,
      );
      return result;
    } catch (error) {
      console.error(
        'An error occurred while evaluating the Langechain pitch:',
        error,
      );
      throw new Error('Failed to evaluate the pitch'); // Or handle error differently
    } finally {
      this.isProcessing = false;
    }
  }

  async actuallyEvaluateLangechainPitch(
    evaluatePitchDto: EvaluateLCPitchDto | EvaluateLCPitchAdminDto,
  ): Promise<any> {
    const modelName = evaluatePitchDto.modelName;
    const pitchText = evaluatePitchDto.pitchText;

    // find or create user and save pitch
    const userId = await this.getUserId(evaluatePitchDto.email);

    if (!userId) {
      throw new NotFoundException('User not found');
    }

    const savedPitchModel = await this.newPitchModel.create({
      userId,
      pitchText: evaluatePitchDto.pitchText,
    });

    const evaluationConfig = await this.evaluationService.getEvaluationConfig(
      modelName,
    );

    const pitch_evaluation =
      await this.langchainService.evaluatePitchWithOpenAI(
        evaluationConfig,
        pitchText,
      );

    // now save it
    let pitch;
    try {
      pitch = await this.addEvaluation(
        String(savedPitchModel._id),
        pitch_evaluation,
      );
    } catch (error) {
      console.log(error);
    }
    return { evaluation: pitch_evaluation, pitch };
  }
}
