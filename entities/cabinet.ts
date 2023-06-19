import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Speaker } from "./speaker.js";

@Entity()
export class Cabinet {
  @PrimaryKey()
  id!: number;

  @Property()
  type!: string;

  @OneToOne({
    entity: () => Speaker,
    mappedBy: s => s.cabinet,
    eager: true
  })
  speaker?: Speaker;

  constructor(type: string, speaker?: Speaker) {
    this.type = type;
    this.speaker = speaker;
  }
}
