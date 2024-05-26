import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TelegramModule } from '../telegram/telegram.module';
import { MoonModule } from 'src/moon/moon.module';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TelegramModule, MoonModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
