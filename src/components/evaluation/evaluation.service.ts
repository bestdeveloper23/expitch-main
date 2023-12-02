import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evaluation } from '../user/model/evaluation.schema';
import { EvaluationNameConstants } from 'src/core/prompts';
import {
  CreateEvaluationDto,
  UpdateEvaluationDto,
} from './dto/createEvaluation.dto';
import formatSchema from './functions';
import { EvaluationConfig } from '../user/model/evaluationConfig.schema';
import {
  exampleEvaluationConfig,
  exampleEvaluationConfigEmpty,
} from '../user/model/evaluationConfig.entity';
@Injectable()
export class EvaluationService {
  constructor(
    @InjectModel(Evaluation.name)
    private evaluationModel: Model<Evaluation>,
    @InjectModel(EvaluationConfig.name)
    private evaluationConfigModel: Model<EvaluationConfig>,
  ) {}

  async createConfig(name) {
    const example = exampleEvaluationConfigEmpty;
    example.name = name;
    if (name === 'default') {
      throw new BadRequestException('Cannot create default config');
    }
    if (name === 'main') {
      throw new BadRequestException('Cannot create main config');
    }
    try {
      await this.evaluationConfigModel.create(example);
      return example;
    } catch (error) {
      console.error('Error creating config:', error);
      throw error; // or handle the error appropriately
    }
  }

  async getEvaluationConfig(name = 'default') {
    try {
      const config = await this.evaluationConfigModel.findOne({ name }).exec();

      if (!config) {
        // Handle the case where no config with the given name is found.
        // This could be throwing an error, returning a default object, etc.
        throw new Error(`EvaluationConfig with name ${name} not found.`);
      }
      return config;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async updateWithBody(updateEvaluationDto: UpdateEvaluationDto) {
    if (updateEvaluationDto.name === 'main') {
      throw new BadRequestException('Cannot update main evaluation');
    }
    if (updateEvaluationDto.name === 'default') {
      throw new BadRequestException('Cannot update default evaluation');
    }
    const conditions = {
      name: updateEvaluationDto.name,
    };
    const update = { ...updateEvaluationDto };
    return await this.evaluationConfigModel
      .findOneAndUpdate(conditions, update, { new: true })
      .exec();
  }

  async upsertWithBody(createEvaluationDto: CreateEvaluationDto) {
    if (createEvaluationDto.name === 'main') {
      throw new BadRequestException('Cannot upsert main evaluation');
    }
    if (createEvaluationDto.name === 'default') {
      throw new BadRequestException('Cannot upsert default evaluation');
    }
    const conditions = {
      name: createEvaluationDto.name,
    };
    const update = { ...createEvaluationDto };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    return await this.evaluationConfigModel
      .findOneAndUpdate(conditions, update, options)
      .then((res) => {
        return res;
      });
  }

  async findAll() {
    return this.evaluationConfigModel
      .find({}, 'name') // The second argument is a projection
      .exec()
      .then((res) => {
        return res;
      });
  }

  async promoteToMain(name: string) {
    // 1. Find the evaluation with the given name
    const evaluationToPromote = await this.evaluationConfigModel
      .findOne({ name })
      .exec();
    if (!evaluationToPromote) {
      throw new Error(`Evaluation with name ${name} not found`);
    }
    const evaluationData = evaluationToPromote.toObject();
    delete evaluationData._id;
    delete evaluationData.name;
    evaluationData.name = 'main';

    // 2. Update (or overwrite) the main record with the data from the evaluation with the given name
    const options = { upsert: true, new: true };
    const mainEvaluation = await this.evaluationConfigModel
      .findOneAndUpdate({ name: 'main' }, evaluationData, options)
      .exec();

    return mainEvaluation;
  }

  async delete(id: string) {
    const evaluation = await this.evaluationConfigModel.findById(id).exec();
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }
    if (evaluation.name === 'main') {
      throw new BadRequestException('Cannot delete main evaluation');
    }
    if (evaluation.name === 'default') {
      throw new BadRequestException('Cannot delete default evaluation');
    }
    this.evaluationConfigModel.findByIdAndDelete(id).exec();
    return;
  }

  findOne(id: string) {
    return this.evaluationModel.findById(id).exec();
  }

  async getEvaluationTemplate(modelName = 'main') {
    const model = await this.evaluationModel.findOne({ modelName }).exec();
    if (model) {
      return model;
    } else {
      return EvaluationNameConstants;
    }
  }

  convertEvaluationToLangchainFormat(json: any) {
    return {
      modelName: json.modelName,
      IsInputAPitch: json.IsInputAPitch,
      FeaturesAndBenefits: {
        LetterGrade: json.LetterGradeFeaturesBenefits,
        Evaluation: json.EvaluationFeaturesBenefits,
        Recommendations: json.RecommendationsFeaturesBenefits,
      },
      Readiness: {
        LetterGrade: json.LetterGradeReadiness,
        Evaluation: json.EvaluationReadiness,
        Recommendations: json.RecommendationsReadiness,
      },
      BarrierToEntry: {
        LetterGrade: json.LetterBTE,
        Evaluation: json.EvaluationBTE,
        Recommendations: json.RecommendationsBTE,
      },
      Adoption: {
        LetterGrade: json.LetterAdoption,
        Evaluation: json.EvaluationAdoption,
        Recommendations: json.RecommendationsAdoption,
      },
      SupplyChain: {
        LetterGrade: json.LetterSupplyChain,
        Evaluation: json.EvaluationSupplyChain,
        Recommendations: json.RecommendationsSupplyChain,
      },
      MarketSize: {
        LetterGrade: json.LetterMarketSize,
        Evaluation: json.EvaluationMarketSize,
        Recommendations: json.RecommendationsMarketSize,
      },
      EntrepreneurExperience: {
        LetterGrade: json.LetterEE,
        Evaluation: json.EvaluationEE,
        Recommendations: json.RecommendationsEE,
      },
      FinancialExpectations: {
        LetterGrade: json.LetterFE,
        Evaluation: json.EvaluationFE,
        Recommendations: json.RecommendationsFE,
      },
    };
  }

  async getMainPitchEvaluationSchema(modelName = 'main') {
    // this gets the main pitch evaluation schema from mongo or uses the default one if it doesn't exist
    const mainPitchEvaluationSchema = await this.evaluationModel.findOne({
      modelName,
    });
    if (mainPitchEvaluationSchema) {
      return formatSchema(mainPitchEvaluationSchema);
    } else {
      return formatSchema(EvaluationNameConstants);
    }
  }
}
