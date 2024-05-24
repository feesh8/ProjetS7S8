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

  @Column("decimal", { precision: 10, scale: 6 })
  latitude!: number;

  @Column("decimal", { precision: 10, scale: 6 })
  longitude!: number;

  @Column()
  adresse!: string;

  @Column()
  date!: string;

  @Column()
  description!: string;

  @Column()
  type!: string;
}
