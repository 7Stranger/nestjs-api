import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import configs from '../../configs';

@Injectable()
export class DatabaseService {
  private appDataSource: DataSource;
  constructor() {
    this.appDataSource = new DataSource({
      ...configs.providers.db,
    });
    this.appDataSource.initialize();
  }

  public query(query: string, parameters?: any[]): Promise<any> {
    return this.appDataSource.query(query, parameters);
  }
}
