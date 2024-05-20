import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './providers/db/db.module';
// import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler';
// import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule,
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
