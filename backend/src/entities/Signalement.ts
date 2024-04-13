import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { Utilisateur } from "./Utilisateur";
import "reflect-metadata";

@Entity()
export class Signalement {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Utilisateur, (user) => user.signalements)
  @JoinTable()
  user!: Utilisateur; // Relation ManyToOne avec User

  @Column()
  latitude!: number;

  @Column()
  longitude!: number;

  @Column()
  adresse!: string;

  @Column()
  date!: string;

  @Column()
  type!: string;

  @Column()
  description!: string;
}
