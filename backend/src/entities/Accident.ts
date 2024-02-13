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
export class Accident {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.accidents)
  @JoinTable()
  user!: Utilisateur; // Relation ManyToOne avec User

  @Column()
  latitude!: number;

  @Column()
  longitude!: number;

  @Column()
  date!: Date;

  @Column()
  description!: string;
}
