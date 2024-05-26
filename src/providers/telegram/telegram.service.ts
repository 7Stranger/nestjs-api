import { Injectable } from '@nestjs/common';
import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import { DatabaseService } from '../db/db.service';
import configs from '../../configs';
import { ITelegramUser } from './interfaces/tg_user.interface';
import { getSqlRaisedError } from 'src/common/utils/getSqlRaisedError';
import { CustomErrorCodes, SQL_RAISE_EXCEPTION_CODE } from 'src/common/enums/error_codes.enum';
import { GptService } from '../gpt/gpt.service';

type Context = Scenes.SceneContext;

const TG_API_KEY = configs.providers.tg.apiKey;
// const TELEGRAM_CHANNEL_NUM = configs.providers.tg.channelNum;

const bot = new Telegraf(TG_API_KEY);

@Update()
@Injectable()
export class TelegramService extends Telegraf<Context> {
  constructor(private readonly dbService: DatabaseService, private readonly gptService: GptService) {
    super(TG_API_KEY);
  }

  @Start()
  private async onStart(@Ctx() ctx: Context): Promise<void> {
    const tgUser: ITelegramUser = ctx.from;
    if (tgUser.is_bot) {
      await ctx.replyWithHTML(`Sorry, bots is not available! Bye, ${tgUser.username}!`);
      return;
    }
    try {
      await this.dbService.query(`CALL create_new_user_from_bot($1)`, [tgUser]);
      await ctx.replyWithHTML(`Hello, <b>${tgUser.username ?? tgUser.first_name}</b>!`);
    } catch (err) {
      if (err.code === SQL_RAISE_EXCEPTION_CODE) {
        // const raisedError = getSqlRaisedError(err);
        // if (raisedError.code === CustomErrorCodes.USER_ALREADY_EXISTS) {
        //   await ctx.replyWithHTML(`Hello, <b>${tgUser.username ?? tgUser.first_name}</b>! Again :)`);
        // }
      }
    }
  }

  @On('text')
  private async onText(@Ctx() ctx: Context, @Message('text') message: string): Promise<void> {
    // await bot.telegram.sendPhoto(
    //   TELEGRAM_CHANNEL,
    //   'https://wintik.com.ua/image/cache/webp/catalog/YML-DC/d34/IMGd341e195eb82346356cec5cc38514e42-1200x1200.webp',
    // );
    // await bot.telegram.sendMessage(TELEGRAM_CHANNEL, message);
    // const res = await lastValueFrom(this.gptService.getGptResponse(message));
    // await ctx.reply(res);
    // const res = await this.gptService.main();
    // await ctx.reply(res);
  }

  public async sendTextMessageToChannel(channelId: string, message: string): Promise<void> {
    await bot.telegram.sendMessage(channelId, message);
  }
}
