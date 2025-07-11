import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RendezVous } from "./RendezVous"; // import *type-only* pour casser le cycle

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

    @OneToMany(() => RendezVous, (rdv) => rdv.doctor)
    rendezvous!: RendezVous[];
}
