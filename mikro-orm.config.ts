import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { CustomNamingStrategy } from './naming-strategy.js';

export default defineConfig({
  // dbName: ':memory:',
  dynamicImportProvider: (id) => import(id),
  entities: ['./entities/*.ts'],
  metadataProvider: TsMorphMetadataProvider,
  allowGlobalContext: true, // only for testing!
  debug: true,
  // as batch insert in sqlite requires returning statements now, we need to disable it
  useBatchInserts: false,
  namingStrategy: CustomNamingStrategy,
  driver: PostgreSqlDriver,
  clientUrl: process.env.DATABASE_URL,
});
