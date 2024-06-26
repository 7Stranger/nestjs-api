import { Controller, Get } from '@nestjs/common';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Get('usage')
  private getUsage() {
    return this.gptService.main();
  }
  @Get('response')
  private getGptResponse() {
    return this.gptService.getGptResponse('HI!');
  }
}
