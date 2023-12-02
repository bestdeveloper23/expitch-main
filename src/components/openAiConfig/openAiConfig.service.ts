import { Injectable } from '@nestjs/common';
import { OpenAiConfig } from './model/openAiConfig.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ModelName } from 'src/core/constants';

@Injectable()
export class OpenAiConfigService {
  constructor(
    @InjectModel(OpenAiConfig.name)
    private openAIConfigModel: Model<OpenAiConfig>,
  ) {}

  async findAll(): Promise<OpenAiConfig[]> {
    return this.openAIConfigModel.find().exec();
  }

  async getOpenAiConfigByModel(name: ModelName): Promise<OpenAiConfig> {
    return await this.openAIConfigModel
      .findOne({
        name,
      })
      .exec();
  }
}
