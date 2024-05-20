import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import configs from 'src/configs';
import { DatabaseService } from './db.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...configs.providers.db,
      synchronize: false,
      entities: ['dist/**/*.entity.js'],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
