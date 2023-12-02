import { Module } from '@nestjs/common';
import { OpenAiConfigController } from './openAiConfig.controller';
import { OpenAiConfigService } from './openAiConfig.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenAIConfigSchema, OpenAiConfig } from './model/openAiConfig.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OpenAiConfig.name, schema: OpenAIConfigSchema },
    ]),
  ],
  controllers: [OpenAiConfigController],
  providers: [OpenAiConfigService],
  exports: [OpenAiConfigService],
})
export class OpenAiConfigModule {}
