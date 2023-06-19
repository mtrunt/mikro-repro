import { test, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import { MikroORM, wrap } from '@mikro-orm/core';
import config from './mikro-orm.config.js';
import { BookshelfSpeaker, Speaker, TowerSpeaker } from './entities/speaker.js';
import { Cabinet } from './entities/cabinet.js';

let orm: MikroORM;

beforeAll(async () => {
  orm = await MikroORM.init(config);
  // await orm.schema.refreshDatabase();
});

afterAll(async () => {
  await orm.close();
});

beforeEach(async () => {
  await orm.schema.clearDatabase();
  await createEntities();
});

test('your test here', async () => {
  const speaker = await orm.em.findOne(Speaker, { id: 2 });
  expect(speaker).toBeDefined();

  /**
   v5.7.12 debug

   [query] select `w0`.* from `wall` as `w0` where `w0`.`id` = 1 limit 1 [took 0 ms, 1 result]
   [query] select `b0`.*, `w1`.`id` as `location_id` from `speaker` as `b0` left join `wall` as `w1` on `b0`.`id` = `w1`.`speaker_id` where `b0`.`id` in (2) and `b0`.`locationtype` = 'Bookshelf' order by `b0`.`id` asc [took 2 ms, 1 result]
   */
});

async function createEntities() {
  const cabinet = new Cabinet('Bookshelf');

  const tower = new TowerSpeaker('Tower Speaker', 'Tower', 'metal', cabinet);
  const bookshelf = new BookshelfSpeaker(
    'Bookshelf Speaker',
    'Bookshelf',
    'vesa',
    cabinet
  );

  await orm.em.persistAndFlush([tower, bookshelf]);

  orm.em.clear();
}
