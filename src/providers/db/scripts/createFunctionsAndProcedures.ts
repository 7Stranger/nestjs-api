import { readFile, readdir } from 'fs/promises';
import * as path from 'path';
import configs from '../../../configs';
import { DataSource } from 'typeorm';
import { OrmConfig } from '../data-source';

(async (): Promise<void> => {
  const dataSourceOptions: OrmConfig = {
    ...configs.providers.db,
  };

  const dataSource = new DataSource(dataSourceOptions);
  await dataSource.initialize();

  const functionFilesPath = path.join(__dirname, '..', 'sql/functions');
  const functionFiles = await readdir(functionFilesPath);

  for (const file of functionFiles) {
    const data = await readFile(functionFilesPath + '/' + file, 'utf8');
    await dataSource.query(data);
    console.log('SQL function ', file, ' created!');
  }

  const procedureFilesPath = path.join(__dirname, '..', 'sql/procedures');
  const procedureFiles = await readdir(procedureFilesPath);

  for (const file of procedureFiles) {
    const data = await readFile(procedureFilesPath + '/' + file, 'utf8');
    await dataSource.query(data);
    console.log('SQL procedure ', file, ' created!');
  }

  const triggerFilesPath = path.join(__dirname, '..', 'sql/triggers');
  const triggerFiles = await readdir(triggerFilesPath);

  for (const file of triggerFiles) {
    const data = await readFile(triggerFilesPath + '/' + file, 'utf8');
    await dataSource.query(data);
    console.log('SQL trigger ', file, ' created!');
  }

  const [{ tables }] = await dataSource.query(`
    SELECT
      json_agg(table_name) AS "tables"
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
  `);

  for (const table of tables) {
    console.log(`SQL trigger set_updated_at_to_now for table ${table} created!`);
    await dataSource.query(`
    DROP TRIGGER IF EXISTS set_updated_at_to_now ON ${table};
    CREATE TRIGGER set_updated_at_to_now BEFORE UPDATE ON ${table}
      FOR EACH ROW EXECUTE PROCEDURE set_updated_at_to_now();
    `);
  }
  process.exit(0);
})();
