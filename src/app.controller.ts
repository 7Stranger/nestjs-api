import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetRequestIndexDto } from './dto/get-request-index.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('liveness')
  private liveness() {
    return 'OK';
  }

  @Post()
  private getRequestIndex(@Body() dto: GetRequestIndexDto): Promise<number> {
    return this.appService.getRequestIndex(dto.requestIndex);
  }
}
