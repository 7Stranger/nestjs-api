import { Injectable } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import configs from 'src/configs';
import { MoonService } from 'src/moon/moon.service';

const TIME_ZONE = configs.constants.timeZone;
const TELEGRAM_CHANNEL_MOON = configs.providers.tg.channelMoon;

@Injectable()
export class TasksService {
  constructor(private readonly telegramService: TelegramService, private readonly moonService: MoonService) {}

  @Cron('0 09 * * *', { timeZone: TIME_ZONE })
  public async postToMoonChannel(): Promise<void> {
    const moonPhase = this.moonService.getMoonPhase();
    const moonDay = this.moonService.getMoonAge(new Date().toString());
    const message = `Місячний день сьогодні: ${moonDay.toFixed(1)}
Місячна фаза: ${moonPhase.name.ua}

${moonPhase.description}`;

    await this.telegramService.sendTextMessageToChannel(TELEGRAM_CHANNEL_MOON, message);
  }

  // @Cron('0 */5 * * * *', { timeZone: TIME_ZONE })
  // public async sendNotifications(): Promise<any> {
  //   console.log('CRON 15!!!');
  //   const message = `Today is ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-GB')}`;
  //   try {
  //     await this.telegramService.sendTextMessageToChannel(message);
  //   } catch (err) {
  //     console.log('NOTIFICATIONS ERROR: ', err);
  //   }
  // }
}
