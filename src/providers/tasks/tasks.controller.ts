import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('moon')
  private async postToMoonChannel(): Promise<void> {
    return this.tasksService.postToMoonChannel();
  }
}
