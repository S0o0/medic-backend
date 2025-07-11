import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("rdv2")
export class RendezVous {
    @PrimaryGeneratedColumn({ name: "rdv_id" })
    id!: number;

    @Column()
    patient_nom!: string;

    @Column()
    patient_prenom!: string;

    @Column({ length: 10 })
    patient_tel!: string;

    @Column({ length: 15 })
    num_secu!: string;

    @Column()
    date!: Date;

    @ManyToOne(() => User, (user) => user.rendezvous)
    @JoinColumn({ name: "doctor_id" })
    doctor!: User;
}
