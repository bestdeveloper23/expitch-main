import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AiQuestionRequestModel } from './model/ai-question-request';
import { CreateCompletionResponse, ListModelsResponse } from 'openai';
import { OpenAiIntegrationService } from './openAiIntegration.service';
import { demoPitch1 } from 'src/core/prompts';
import { PitchEvaluation } from 'src/core/functions';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileNotProvidedException } from './openAiIntegration.exceptions';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ValidateDtoPipe } from 'src/core/pipes/validate-dto.pipe';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateEvaluationInput } from './dto/create-evaluation.input';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('open-ai')
@Controller('open-ai')
export class OpenAiIntegrationController {
  constructor(private readonly openAIService: OpenAiIntegrationService) {}

  @ApiOperation({
    summary: 'TODO.',
    description: 'TODO.',
  })
  @Post('/messageWithParams')
  @UsePipes(ValidationPipe)
  getModelAnswerFromProvidedSettings(
    @Body() data: AiQuestionRequestModel,
  ): Promise<CreateCompletionResponse> {
    return this.openAIService.getModelAnswerFromProvidedSettings(data);
  }

  @ApiOperation({
    summary: 'TODO.',
    description: 'TODO.',
  })
  @Get('/listModels')
  listModels(): Promise<ListModelsResponse> {
    return this.openAIService.listModels();
  }

  @ApiOperation({
    summary: 'TODO.',
    description: 'TODO.',
  })
  @Get('/isPitchByFunctions')
  evaluatePitchByFinctionCalling(): Promise<PitchEvaluation> {
    return this.openAIService.getPitchWithSchema(demoPitch1);
  }

  @ApiOperation({
    summary: 'TODO.',
    description: 'TODO.',
  })
  @Post('/getPitchEvalForAudio')
  @UseInterceptors(
    FileInterceptor('pitchFile', {
      storage: diskStorage({
        destination: '/tmp',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async uploadAudio(
    @Body(new ValidateDtoPipe()) CreateEvaluationInput: CreateEvaluationInput,
    @UploadedFile() pitchFile: Express.Multer.File,
    @Res() res: Response,
  ): Promise<void> {
    if (!pitchFile) {
      throw new FileNotProvidedException();
    }

    await this.openAIService.getPitchEvaluationForAudio(
      CreateEvaluationInput,
      pitchFile,
      res,
    );
  }
}
