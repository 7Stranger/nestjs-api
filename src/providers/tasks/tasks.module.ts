import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TelegramModule } from '../telegram/telegram.module';
import { MoonModule } from 'src/moon/moon.module';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from '../db/db.module';
import { GptModule } from '../gpt/gpt.module';

@Module({
  imports: [DatabaseModule, TelegramModule, MoonModule, GptModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
