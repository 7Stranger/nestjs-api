import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('moon')
  private async postToMoonChannel(): Promise<string> {
    await this.tasksService.postToMoonChannel();
    return 'OK';
  }

  @Get('test')
  private test(): string {
    return 'TEST!!!!';
  }
}
