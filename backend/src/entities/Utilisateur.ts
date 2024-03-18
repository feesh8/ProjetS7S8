import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
} from "typeorm";
import { Accident } from "./Accident";
import { DangerousZone } from "./DangerousZone";
import "reflect-metadata";

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  mot_de_passe!: string;

  @OneToMany(() => Accident, (accident) => accident.user, { eager: true })
  @JoinTable()
  accidents!: Accident[]; // Relation OneToMany avec Accident

  @OneToMany(() => DangerousZone, (zone) => zone.user, { eager: true })
  @JoinTable()
  dangerousZones!: DangerousZone[]; // Relation OneToMany avec Accident
}
