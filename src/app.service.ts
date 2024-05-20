import { Injectable } from '@nestjs/common';
import { DatabaseService } from './providers/db/db.service';

@Injectable()
export class AppService {
  constructor(private readonly dbService: DatabaseService) {}

  // public async createUsers(col: number): Promise<void> {
  //   for (let i = 0; i < col; i++) {
  //     await this.dbService.query(`
  //     INSERT INTO users (
  //       "first_name",
  //       "last_name"
  //     ) VALUES (
  //       '${i}',
  //       '${i * 10}'
  //     )
  //   `);
  //   }
  // }

  // public async getUsers(): Promise<void> {
  //   return this.dbService.query(`
  //     SELECT * FROM users;
  //   `);
  // }
}
