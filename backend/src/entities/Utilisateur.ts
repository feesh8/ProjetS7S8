import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
} from "typeorm";
import "reflect-metadata";
import { Signalement } from "./Signalement";

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  mot_de_passe!: string;

  @OneToMany(() => Signalement, (accident) => accident.user, { eager: true })
  @JoinTable()
  signalements!: Signalement[]; // Relation OneToMany avec Accident
}
