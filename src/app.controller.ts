import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('liveness')
  private liveness(): string {
    return 'OK';
  }

  // @Post('test/:col')
  // private createUsers(@Param('col') col: number): Promise<void> {
  //   return this.appService.createUsers(col);
  // }

  // @Get('users')
  // private getUsers() {
  //   return this.appService.getUsers();
  // }
}
