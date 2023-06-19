import { test, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import { MikroORM, wrap } from '@mikro-orm/core';
import config from './mikro-orm.config.js';
import { BookshelfSpeaker, Speaker, TowerSpeaker } from './entities/speaker.js';
import { Cabinet } from './entities/cabinet.js';

let orm: MikroORM;

beforeAll(async () => {
  orm = await MikroORM.init(config);
  await orm.schema.refreshDatabase();
});

afterAll(async () => {
  await orm.close();
});

beforeEach(async () => {
  await orm.schema.clearDatabase();
  await createEntities();
});

test('your test here', async () => {
  const speaker = await orm.em.findOne(TowerSpeaker, { id: 1 });
  expect(speaker).toBeDefined();
});

async function createEntities() {
  const cabinet = new Cabinet('Bookshelf');

  const tower = new TowerSpeaker('Tower Speaker', 'Tower', 'metal', cabinet);
  // const bookshelf = new BookshelfSpeaker(
  //   'Bookshelf Speaker',
  //   'Bookshelf',
  //   'vesa',
  //   cabinet
  // );

  await orm.em.persistAndFlush([tower]);

  orm.em.clear();
}
