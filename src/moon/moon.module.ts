import { Module } from '@nestjs/common';
import { MoonService } from './moon.service';
import { TelegramModule } from 'src/providers/telegram/telegram.module';

@Module({
  imports: [TelegramModule],
  providers: [MoonService],
  exports: [MoonService],
})
export class MoonModule {}
