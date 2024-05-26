import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './providers/db/db.module';
import { TelegramModule } from './providers/telegram/telegram.module';
// import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler';
// import { APP_GUARD } from '@nestjs/core';
import { TasksModule } from './providers/tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { GptModule } from './providers/gpt/gpt.module';
import { MoonModule } from './moon/moon.module';

@Module({
  imports: [
    DatabaseModule,
    TelegramModule,
    TasksModule,
    ScheduleModule.forRoot(),
    GptModule,
    MoonModule,
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: seconds(1),
    //     limit: 50,
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule {}
