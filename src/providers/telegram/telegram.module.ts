import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import configs from '../../configs';
import { DatabaseModule } from '../db/db.module';
import { GptModule } from '../gpt/gpt.module';

const TG_API_KEY = configs.providers.tg.apiKey;

@Module({
  imports: [
    DatabaseModule,
    TelegrafModule.forRoot({
      token: TG_API_KEY,
    }),
    GptModule,
  ],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
