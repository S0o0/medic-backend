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
    date!: Date;

    @Column()
    num_secu!: string;

    @ManyToOne(
        () => require("./User").User, // ✅ synchro
        (user: User) => user.rendezvous
    )
    @JoinColumn({ name: "doctor_id" })
    doctor!: User;
}