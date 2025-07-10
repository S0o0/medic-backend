import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { config } from "dotenv";

config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: true,
});
