import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import configs from '../../configs';

export type OrmConfig = TypeOrmModuleOptions &
  DataSourceOptions & {
    seeds?: string[];
    factories?: string[];
  };

export const dataSourceOptions: OrmConfig = {
  ...configs.providers.db,
};

console.log('== LOADING DATA SOURCE CONFIG ==');
console.log(dataSourceOptions);

export default new DataSource(dataSourceOptions);
