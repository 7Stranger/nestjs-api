import { Injectable } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';
import { Cron } from '@nestjs/schedule';
import configs from 'src/configs';
import { MoonService } from 'src/moon/moon.service';
import { DatabaseService } from '../db/db.service';
import { GptService } from '../gpt/gpt.service';

const TIME_ZONE = configs.constants.timeZone;
const TELEGRAM_CHANNEL_MOON = configs.providers.tg.channelMoon;

@Injectable()
export class TasksService {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly moonService: MoonService,
    private readonly dbService: DatabaseService,
    private readonly gptService: GptService,
  ) {}

  @Cron('0 10-22 * * *', { timeZone: TIME_ZONE })
  public async postSheduledPost(): Promise<void> {
    try {
      const [{ post }] = await this.dbService.query(`SELECT * FROM get_sheduled_post() AS "post"`);
      if (!post || post.content === null) {
        console.log('NO POSTS FOR TODAY');
        return;
      }
      const message = post.content;
      await this.telegramService.sendTextMessageToChannel(TELEGRAM_CHANNEL_MOON, message);
    } catch (err) {
      console.log(err);
      return;
    }
  }

  @Cron('0 09 * * *', { timeZone: TIME_ZONE })
  public async postToMoonChannel(): Promise<void> {
    try {
      const moonPhase = await this.moonService.getMoonPhase();
      const message = `Місячний день сьогодні: ${moonPhase.moonDay}
Місячна фаза: ${moonPhase.name}

${moonPhase.description}`;

      await this.telegramService.sendTextMessageToChannel(TELEGRAM_CHANNEL_MOON, message);
    } catch (err) {
      console.log(err);
    }
  }

  @Cron('0 08 * * *', { timeZone: TIME_ZONE })
  public async createTodayPosts(): Promise<any> {
    const moonPhase = await this.moonService.getMoonPhase();
    let noPromptsForToday = false;
    let createdPostsCount = 0;
    while (!noPromptsForToday) {
      try {
        const [{ prompts }] = await this.dbService.query(
          `SELECT * FROM get_prompt_messages_for_post($1, $2) AS "prompts"`,
          [moonPhase.moonDay, moonPhase.name],
        );
        if (!prompts || prompts === null) {
          noPromptsForToday = true;
          break;
        }
        const post = await this.gptService.getPost(prompts);
        await this.dbService.query(`CALL create_new_post($1, $2, $3, $4)`, [
          prompts.rubric.id,
          prompts.user.id,
          prompts.system.id,
          post,
        ]);
        createdPostsCount++;
      } catch (err) {
        console.log(err);
        noPromptsForToday = true;
        break;
      }
    }
    console.log(`Created ${createdPostsCount} posts`);
    return `Created ${createdPostsCount} posts`;
  }
}
