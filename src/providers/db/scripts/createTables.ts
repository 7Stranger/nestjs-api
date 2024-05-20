import { readFile } from 'fs/promises';
import * as path from 'path';
import configs from '../../../configs';
import { DataSource } from 'typeorm';
import { OrmConfig } from '../data-source';

(async (): Promise<void> => {
  const dataSourceOptions: OrmConfig = {
    ...configs.providers.db,
  };

  const dataSource = new DataSource(dataSourceOptions);

  const normalizedSqlPath = path.join(__dirname, '..', 'sql/createTables.sql');
  const data = await readFile(normalizedSqlPath, 'utf8');
  await dataSource.initialize();
  await dataSource.query(data);
  process.exit(0);
})();
