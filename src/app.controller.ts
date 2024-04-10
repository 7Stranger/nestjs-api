import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetRequestIndexDto } from './dto/get-request-index.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  private getRequestIndex(@Body() dto: GetRequestIndexDto): Promise<number> {
    return this.appService.getRequestIndex(dto.requestIndex);
  }
}
