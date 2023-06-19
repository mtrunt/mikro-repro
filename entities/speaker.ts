import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Cabinet } from './cabinet.js';

@Entity({ discriminatorColumn: 'cabinetType' })
export class Speaker {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  cabinetType!: string;

  @OneToOne({
    eager: true
  })
  cabinet!: Cabinet;

  constructor(name: string, cabinetType: string, cabinet: Cabinet) {
    this.name = name;
    this.cabinetType = cabinetType;
    this.cabinet = cabinet;
  }
}

@Entity({ discriminatorValue: 'Tower' })
export class TowerSpeaker extends Speaker {
  @Property()
  feetType!: string;

  constructor(name: string, cabinetType: string, feetType: string, cabinet: Cabinet) {
    super(name, cabinetType, cabinet);
    this.feetType = feetType;
  }
}

@Entity({ discriminatorValue: 'Bookshelf' })
export class BookshelfSpeaker extends Speaker {
  @Property()
  mountType!: string;

  constructor(name: string, cabinetType: string, mountType: string, cabinet: Cabinet) {
    super(name, cabinetType, cabinet);
    this.mountType = mountType;
  }
}
