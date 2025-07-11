import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("infos")
export class Information {
    @PrimaryGeneratedColumn({ name: "info_id" })
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;
}
