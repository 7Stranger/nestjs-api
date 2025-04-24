import { CommonService } from './common/common.service';
import { EnvironmentEnum } from './common/enums/environment.enum';
// import * as path from 'path';

CommonService.basicInit();

const {
  NODE_ENV = EnvironmentEnum.local,
  PROJECT_NAME = 'Telegram-Bot',
  TIME_ZONE = 'Europe/Kyiv',
  SHOW_CONFIGS = 'false',
  PORT = '3000',
  DB_HOST = 'tel_db',
  DB_PORT = '5432',
  DB_USERNAME = 'telegram',
  DB_PASSWORD = '1',
  DB_DATABASE = 'telegram',
  TELEGRAM_BOT_API_KEY = 'tg-bot-api-key',
  TELEGRAM_CHANNEL_NUM = 'telegram_channel_name_with_@',
  TELEGRAM_CHANNEL_MOON = 'telegram_channel_name_with_@',
  GPT_API_KEY = 'gpt-api-key',
  GPT_PROJECT_ID = 'gpt-project-id',
} = process.env;

const configs: Record<string, any> = {
  env: {
    isProduction: NODE_ENV === EnvironmentEnum.production,
    isDevelopment: NODE_ENV === EnvironmentEnum.development,
    isLocal: NODE_ENV === EnvironmentEnum.local,
  },
  paths: {},
  projectName: PROJECT_NAME,
  port: PORT,
  providers: {
    db: {
      type: 'postgres',
      host: DB_HOST,
      port: NODE_ENV === EnvironmentEnum.local ? DB_PORT : undefined,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      seeds: ['src/providers/db/seeds/*.seed.ts'],
      entities: ['dist/**/*.entity.js'],
      migrationsTableName: 'migrations',
      autoLoadEntities: true,
      migrations: ['dist/providers/db/migrations/*.js'],
      synchronize: false,
      // ssl: {
      //   required: true,
      // },
      ssl:
        NODE_ENV === EnvironmentEnum.local
          ? undefined
          : {
              required: true,
            },
      poolSize: 1,
      extra: {
        max: 1,
        connectionTimeoutMillis: 1000,
      },
    },
    tg: {
      apiKey: TELEGRAM_BOT_API_KEY,
      channelNum: TELEGRAM_CHANNEL_NUM,
      channelMoon: TELEGRAM_CHANNEL_MOON,
    },
    gpt: {
      apiKey: GPT_API_KEY,
      projectId: GPT_PROJECT_ID,
    },
  },
  constants: {
    timeZone: TIME_ZONE,
  },
};

if (SHOW_CONFIGS === 'true') {
  // TODO: hide unsecure data
  console.info('-- SERVER CONFIGS --------------------------------');
  console.info(JSON.stringify(configs, null, 2));
  console.info('--------------------------------------------------');
}

export default configs;
