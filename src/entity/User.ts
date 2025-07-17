import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import type { RendezVous } from "./RendezVous";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  users_id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  speciality!: string;

  @Column({ nullable: true })
  adress!: string;

  @OneToMany(
    () => require("./RendezVous").RendezVous, // ✅ synchro, pas de promesse
    (rdv: RendezVous) => rdv.doctor
  )
  rendezvous!: RendezVous[];
}