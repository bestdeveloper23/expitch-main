import { Controller, Get } from '@nestjs/common';
import { OpenAiConfigService } from './openAiConfig.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('openai-config')
@Controller('openai-config')
export class OpenAiConfigController {
  constructor(private readonly openAIConfigService: OpenAiConfigService) {}

  @ApiOperation({
    summary: 'TODO.',
    description: 'TODO.',
  })
  @Get('getAll')
  async getAll() {
    return this.openAIConfigService.findAll();
  }
}
