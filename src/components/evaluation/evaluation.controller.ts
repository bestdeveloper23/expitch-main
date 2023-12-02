import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
  Patch,
} from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import {
  CreateEvaluationDto,
  ExampleUpdateDto,
  UpdateEvaluationDto,
} from './dto/createEvaluation.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetModelResponse, UpsertEvaluationResponse } from './dto/response.dto';
const exampleId = '64ee2e37ce765290a5a9c1ab';

@ApiTags('evaluation')
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post('config/:name')
  @ApiOperation({
    summary: 'Creates an empty evaluation with the name provided as parameter.',
    description:
      'This uses the same parameters as the exampleEvaluationConfigEmpty config in the `evaluationConfig.entity.ts` file.',
  })
  @ApiParam({
    name: 'name',
    description: 'The name of the evaluation to create.',
  })
  @ApiResponse({
    status: 201,
    description: 'The evaluation was created.',
  })
  createNewConfig(@Param('name') name: string) {
    return this.evaluationService.createConfig(name);
    // Creates an evaluation in mongo with the name provided
  }

  @Get('config/:name')
  @ApiOperation({
    summary: 'Get One',
    description: 'Returns one evaluation in the database',
  })
  @ApiNotFoundResponse({
    description: 'Evaluation not found',
  })
  @ApiParam({
    name: 'name',
    example: 'default',
  })
  getConifg(@Param('name') name: string) {
    return this.evaluationService.getEvaluationConfig(name);
    // Creates an evaluation in mongo with the name provided
  }

  @Patch('')
  @ApiOperation({
    summary: 'Update an evaluation with the name provided as parameter.',
    description:
      'This will only update the parameters passed in the body. Must contain model name and at least one other property.\
      from this list: \
      `IsInputAPitch, FeatureBenefits, Readiness, BarrierToEntry, Adoption,\
      SupplyChain, MarketSize, EntrepreneurExperience, FinancialExpectations`',
  })
  @ApiBody({
    type: ExampleUpdateDto,
  })
  @ApiOkResponse({
    type: UpsertEvaluationResponse,
  })
  @ApiBadRequestResponse({
    description: 'Cannot update main or default evaluations',
  })
  update(@Body() updateEvaluationDto: UpdateEvaluationDto) {
    // Creates an evaluation in mongo with the name provided
    return this.evaluationService.updateWithBody(updateEvaluationDto);
  }

  @Put()
  @ApiOperation({
    summary: 'Upsert an evaluation with the name provided as parameter.',
    description:
      'This will create an evaluation if it does not exist, or update it if it does. This will contain all the parameters passed in the body.',
  })
  @ApiBody({
    type: CreateEvaluationDto,
  })
  @ApiOkResponse({
    type: UpsertEvaluationResponse,
  })
  @ApiBadRequestResponse({
    description: 'Cannot deleted main or default evaluations',
  })
  upsert(@Body() createEvaluationDto: CreateEvaluationDto) {
    // Creates an evaluation in mongo with the name provided
    return this.evaluationService.upsertWithBody(createEvaluationDto);
  }

  @Post('promote/:name')
  @ApiOperation({
    summary: 'Overwrite `main` evaluation model in db with the one provided.',
    description: 'Sets a new main evaluation model in the database.',
  })
  @ApiNotFoundResponse({
    description: 'Evaluation not found',
  })
  @ApiOkResponse({
    type: UpsertEvaluationResponse,
  })
  promoteToMain(@Param('name') name: string) {
    // Promotes an evaluation to main
    return this.evaluationService.promoteToMain(name);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes an evaluation with the id provided as parameter.',
    description: 'Cannot delete main or default evaluations.',
  })
  @ApiNotFoundResponse({
    description: 'Evaluation not found',
  })
  @ApiBadRequestResponse({
    description: 'Cannot deleted main or default evaluations',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the evaluation to delete.',
    example: exampleId,
  })
  delete(@Param('id') id: string) {
    return this.evaluationService.delete(id);
  }

  @ApiOperation({
    summary: 'Get All',
    description: 'Returns all evaluations in the database',
  })
  @ApiOkResponse({
    type: GetModelResponse,
    isArray: true,
  })
  @Get()
  async findAll() {
    return await this.evaluationService.findAll();
  }
}
