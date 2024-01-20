import {
  Body,
  Controller,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ValidateDtoPipe } from 'src/core/pipes/validate-dto.pipe';
import { FileNotProvidedException } from '../openAiIntegration/openAiIntegration.exceptions';
import { PitchService } from './pitch.service';
import { Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  CreateEvaluationInput,
  TranscribeAudioDto,
} from './dto/create-evaluation.input';
import { FileTypeValidator } from 'src/core/pipes/file-type.validator';
import { InvalidFileTypeException } from '../openAiIntegration/openAiIntegration.exceptions';
import { ResponseMessage } from 'src/core/constants';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import {
  EvaluateLCPitchAdminDto,
  EvaluateLCPitchDto,
  PitchEvaluationResponseDto,
  UploadAdminAudioDto,
  UploadAudioDto,
  UploadPitchAdminDto,
  UploadPitchDto,
  createTextPitchResponse,
  UploadPitchAdminDtoNEW,
  UploadPitchDtoNEW,
  PitchResponseDto,
} from './dto/pitchResponse.dto';
import { GetPitchListForEmail } from './dto/get-pitchlist.input';
import { AuthService } from '../auth/auth.service';
import { NewPitch, Pitch, PitchEvaluation } from './model/pitch.schema';
import { UpdatePitchFileNameInput } from './dto/update-pitchfilename.input';

@ApiTags('pitch')
@Controller('pitch')
export class PitchController {
  constructor(
    private readonly pitchService: PitchService,
    private readonly authService: AuthService,
  ) {}

  @Post('/getPitchEvalForAudio')
  @UseInterceptors(
    FileInterceptor('pitchFile', {
      storage: diskStorage({
        destination: '/tmp',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadPitchDto, description: 'Upload Pitch File' })
  @ApiOperation({ summary: 'Upload and evaluate a pitch audio file' })
  @ApiResponse({
    status: 200,
    description: 'Successful upload and evaluation',
    type: PitchEvaluationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  // this function uploads a file to the server and then calls the pitchService to evaluate it.
  async uploadAudio(
    @Body(new ValidateDtoPipe()) CreateEvaluationInput: CreateEvaluationInput,
    @UploadedFile() pitchFile: Express.Multer.File,
    @Res() res: Response,
  ): Promise<void> {
    // file validation
    await this.authService.validateRecaptcha(
      CreateEvaluationInput.recaptchaToken,
    );

    if (!pitchFile) {
      throw new FileNotProvidedException();
    }
    const isValidFileType = new FileTypeValidator().validate(pitchFile);

    if (!isValidFileType) {
      throw new InvalidFileTypeException();
    }

    // gets user id from email

    const userId = await this.pitchService.getUserId(
      CreateEvaluationInput.email,
    );

    // uploads file to cloud storage

    const fileNameGCS = await this.pitchService.uploadFileToCloudStorage(
      pitchFile,
    );

    // use whisper to transcribe the file

    const pitchText = await this.pitchService.transcribePitch(pitchFile);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    const stepOneRes = {
      message: ResponseMessage.ConvertedToPitch,
      pitch: pitchText,
    };

    res.write(JSON.stringify(stepOneRes));

    // evaluate the pitch

    const evaluation = await this.pitchService.EvaluatePitch(pitchText);

    // saves the pitch to the database

    const pitchMongo = await this.pitchService.savePitch(
      pitchText,
      evaluation,
      fileNameGCS,
      userId,
    );

    const stepTwoRes = {
      message: ResponseMessage.Evaluated,
      evaluation: this.pitchService.convertPitchToOutput(pitchMongo),
    };

    res.end(JSON.stringify(stepTwoRes));
  }

  @Post('/admin/getPitchEvalForAudio')
  @UseInterceptors(
    FileInterceptor('pitchFile', {
      storage: diskStorage({
        destination: '/tmp',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadPitchAdminDto, description: 'Upload Pitch File' })
  @ApiOperation({ summary: 'Upload and evaluate a pitch audio file' })
  @ApiResponse({
    status: 200,
    description: 'Successful upload and evaluation',
    type: PitchEvaluationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  // this function uploads a file to the server and then calls the pitchService to evaluate it.
  async adminUploadAudio(
    @Body(new ValidateDtoPipe()) CreateEvaluationInput: CreateEvaluationInput,
    @UploadedFile() pitchFile: Express.Multer.File,
    @Res() res: Response,
  ): Promise<void> {
    // file validation

    if (!pitchFile) {
      throw new FileNotProvidedException();
    }
    const isValidFileType = new FileTypeValidator().validate(pitchFile);

    if (!isValidFileType) {
      throw new InvalidFileTypeException();
    }

    // gets user id from email

    const userId = await this.pitchService.getUserId(
      CreateEvaluationInput.email,
    );

    // uploads file to cloud storage

    const fileNameGCS = await this.pitchService.uploadFileToCloudStorage(
      pitchFile,
    );

    // use whisper to transcribe the file

    const pitchText = await this.pitchService.transcribePitch(pitchFile);
    const mappedPitchText = await this.pitchService.mapPitchTextToDto(
      pitchText,
      userId,
      CreateEvaluationInput.modelName,
    );

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    // const stepOneRes = {
    //   message: ResponseMessage.ConvertedToPitch,
    //   pitch: pitchText,
    // };

    // res.write(JSON.stringify(stepOneRes));

    // evaluate the pitch

    const evaluation = await this.pitchService.EvaluatePitch(pitchText);

    // saves the pitch to the database

    const pitchMongo = await this.pitchService.savePitch(
      pitchText,
      evaluation,
      fileNameGCS,
      userId,
    );

    const stepTwoRes = {
      message: ResponseMessage.Evaluated,
      evaluation: this.pitchService.convertPitchToOutput(pitchMongo),
    };

    res.end(JSON.stringify(stepTwoRes));
  }
  @Post('/transcribePitch')
  @UseInterceptors(
    FileInterceptor('pitchFile', {
      storage: diskStorage({
        destination: '/tmp',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadAudioDto, description: 'Upload Pitch File' })
  @ApiOperation({ summary: 'Upload and evaluate a pitch audio file' })
  @ApiResponse({
    status: 200,
    description: 'Successful upload and evaluation',
    type: NewPitch,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  // this function uploads a file to the server and then calls the pitchService to evaluate it.
  async transcribeAudio(
    @Body(new ValidateDtoPipe()) transcribeAudioDto: UploadAudioDto,
    @UploadedFile() pitchFile: Express.Multer.File,
  ): Promise<NewPitch> {
    // file validation
    await this.authService.validateRecaptcha(transcribeAudioDto.recaptchaToken);

    if (!pitchFile) {
      throw new FileNotProvidedException();
    }
    const isValidFileType = new FileTypeValidator().validate(pitchFile);

    if (!isValidFileType) {
      throw new InvalidFileTypeException();
    }

    // gets user id from email

    const userId = await this.pitchService.getUserId(transcribeAudioDto.email);
    // uploads file to cloud storage

    // const fileNameGCS = await this.pitchService.uploadFileToCloudStorage(
    //   pitchFile,
    // );

    // use whisper to transcribe the file

    const pitchText = await this.pitchService.transcribePitch(pitchFile);

    // saves the pitch text to the database

    const pitchMongo = await this.pitchService.savePitchText(
      pitchText,
      'noFile',
      userId,
    );
    return pitchMongo;
  }

  @Post('/admin/transcribePitch')
  @UseInterceptors(
    FileInterceptor('pitchFile', {
      storage: diskStorage({
        destination: '/tmp',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadAdminAudioDto, description: 'Upload Pitch File' })
  @ApiOperation({ summary: 'Upload and evaluate a pitch audio file' })
  @ApiResponse({
    status: 200,
    description: 'Successful upload and evaluation',
    type: NewPitch,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  // this function uploads a file to the server and then calls the pitchService to evaluate it.
  async transcribeAudioAdmin(
    @Body(new ValidateDtoPipe()) transcribeAudioDto: UploadAdminAudioDto,
    @UploadedFile() pitchFile: Express.Multer.File,
  ): Promise<NewPitch> {
    // file validation

    if (!pitchFile) {
      throw new FileNotProvidedException();
    }
    const isValidFileType = new FileTypeValidator().validate(pitchFile);

    if (!isValidFileType) {
      throw new InvalidFileTypeException();
    }

    // gets user id from email

    const userId = await this.pitchService.getUserId(transcribeAudioDto.email);

    // uploads file to cloud storage

    // const fileNameGCS = await this.pitchService.uploadFileToCloudStorage(
    //   pitchFile,
    // );

    // use whisper to transcribe the file

    const pitchText = await this.pitchService.transcribePitch(pitchFile);

    // saves the pitch text to the database
    const pitchMongo = await this.pitchService.savePitchText(
      pitchText,
      'noFile',
      userId,
    );

    return pitchMongo;
  }
  @Post('/getPitchEvalForText')
  @ApiBody({ type: EvaluateLCPitchDto, description: 'Upload Pitch File' })
  @ApiOperation({ summary: 'Upload and evaluate a pitch text' })
  @ApiResponse({
    status: 200,
    description: 'Successfully queued the task for evaluation',
    type: createTextPitchResponse, // Update the type if necessary
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async uploadText(
    @Body(new ValidateDtoPipe()) evaluteLCPitchDto: EvaluateLCPitchDto,
  ): Promise<createTextPitchResponse> {
    // Update the return type if necessary
    await this.authService.validateRecaptcha(evaluteLCPitchDto.recaptchaToken);

    // This will now queue the task and return a message
    return await this.pitchService.evaluateLangechainPitch(evaluteLCPitchDto);
  }

  @Post('/admin/getPitchEvalForText')
  @ApiBody({ type: EvaluateLCPitchAdminDto, description: 'Upload Pitch File' })
  @ApiOperation({ summary: 'Upload and evaluate a pitch text' })
  @ApiResponse({
    status: 200,
    description: 'Successful upload and evaluation',
    type: createTextPitchResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  // this function uploads a file to the server and then calls the pitchService to evaluate it.
  async adminUploadText(
    @Body(new ValidateDtoPipe()) evaluteLCPitchDto: EvaluateLCPitchAdminDto,
  ): Promise<createTextPitchResponse> {
    return await this.pitchService.evaluateLangechainPitch(evaluteLCPitchDto);
  }
  @Post('/admin/getPitchEvalForAudioNEW')
  @UseInterceptors(
    FileInterceptor('pitchFile', {
      storage: diskStorage({
        destination: '/tmp',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadPitchAdminDto, description: 'Upload Pitch File' })
  @ApiOperation({
    summary: 'Upload and evaluate a pitch audio file with NEW evaluation',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful upload and evaluation',
    type: createTextPitchResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  // this function uploads a file to the server and then calls the pitchService to evaluate it.
  async adminUploadAudioNEW(
    @Body(new ValidateDtoPipe()) evaluteLCPitchDto: UploadPitchAdminDtoNEW,
    @UploadedFile() pitchFile: Express.Multer.File,
  ): Promise<createTextPitchResponse> {
    const pitchText = await this.pitchService.transcribePitch(pitchFile);
    const mapped = await this.pitchService.mapPitchTextToDto(
      pitchText,
      evaluteLCPitchDto.email,
      evaluteLCPitchDto.modelName,
    );
    return await this.pitchService.evaluateLangechainPitch(mapped);
  }
  @Post('/getPitchEvalForAudioNEW')
  @UseInterceptors(
    FileInterceptor('pitchFile', {
      storage: diskStorage({
        destination: '/tmp',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadPitchDto, description: 'Upload Pitch File' })
  @ApiOperation({
    summary: 'Upload and evaluate a pitch audio file with NEW evaluation',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful upload and evaluation',
    type: createTextPitchResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  // this function uploads a file to the server and then calls the pitchService to evaluate it.
  async UploadAudioNEW(
    @Body(new ValidateDtoPipe()) evaluteLCPitchDto: UploadPitchDtoNEW,
    @UploadedFile() pitchFile: Express.Multer.File,
  ): Promise<createTextPitchResponse> {
    await this.authService.validateRecaptcha(evaluteLCPitchDto.recaptchaToken);
    const pitchText = await this.pitchService.transcribePitch(pitchFile);
    const mapped = await this.pitchService.mapPitchTextToDto(
      pitchText,
      evaluteLCPitchDto.email,
      evaluteLCPitchDto.modelName,
    );
    return await this.pitchService.evaluateLangechainPitch(mapped);
  }

  @Post('/getPitchlistforUser')
  @ApiBody({ type: GetPitchListForEmail, description: 'Upload your email' })
  @ApiOperation({
    summary: 'Upload and get pitches with your email',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful found',
    type: [Pitch],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  // this function uploads a file to the server and then calls the pitchService to evaluate it.
  async GetPitchList(
    @Body(new ValidateDtoPipe()) getPichInput: GetPitchListForEmail,
  ): Promise<Pitch[]> {
    await this.authService.validateRecaptcha(getPichInput.recaptchaToken);

    return await this.pitchService.getPitchfromEmail(getPichInput.email);
  }

  @Post('/updatePitchFileName')
  @ApiBody({
    type: UpdatePitchFileNameInput,
    description: 'Input your fileName',
  })
  @ApiOperation({
    summary: 'Update the your fileName of your pitch',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful Updated',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  // this function uploads a file to the server and then calls the pitchService to evaluate it.
  async UpdatePitchFileName(
    @Body(new ValidateDtoPipe())
    updateFileNamePichInput: UpdatePitchFileNameInput,
  ) {
    await this.authService.validateRecaptcha(
      updateFileNamePichInput.recaptchaToken,
    );

    return await this.pitchService.updatePitchFileName(
      updateFileNamePichInput._id,
      updateFileNamePichInput.fileName,
    );
  }
}
