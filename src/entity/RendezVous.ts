import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import type { User } from "./User";

@Entity()
export class RendezVous {
    @PrimaryGeneratedColumn()
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

    @ManyToOne(
        () => require("./User").User, // ✅ synchro
        (user: User) => user.rendezvous
    )
    @JoinColumn({ name: "doctor_id" })
    doctor!: User;
}