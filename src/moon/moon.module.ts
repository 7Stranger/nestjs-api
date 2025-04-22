import { Module } from '@nestjs/common';
import { MoonService } from './moon.service';
import { TelegramModule } from 'src/providers/telegram/telegram.module';
import { DatabaseModule } from 'src/providers/db/db.module';

@Module({
  imports: [DatabaseModule, TelegramModule],
  providers: [MoonService],
  exports: [MoonService],
})
export class MoonModule {}
