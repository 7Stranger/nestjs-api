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
  DB_HOST = 'db',
  DB_PORT = '5432',
  DB_USERNAME = 'telegram',
  DB_PASSWORD = '1',
  DB_DATABASE = 'telegram',
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
      port: DB_PORT,
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
      //   rejectUnauthorized: false,
      // },
      ssl:
        NODE_ENV === EnvironmentEnum.local
          ? undefined
          : {
              required: true,
              rejectUnauthorized: false,
            },
      poolSize: 1,
      extra: {
        max: 1,
        connectionTimeoutMillis: 1000,
      },
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
