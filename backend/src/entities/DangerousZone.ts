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
export class DangerousZone {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Utilisateur, (user) => user.accidents)
  @JoinTable()
  user!: Utilisateur; // Relation ManyToOne avec User

  @Column()
  latitude!: number;

  @Column()
  longitude!: number;

  @Column()
  description!: string;
}
