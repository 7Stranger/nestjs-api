import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('test')
  private test(@Body() body: any): Promise<any> {
    return this.gptService.test(body.text);
  }
}
