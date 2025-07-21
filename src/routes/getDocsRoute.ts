// src/routes/getDocsRoute.ts
import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { User } from "../entity/User";
import { Not } from "typeorm";

export const getDocsRoute = new Hono();

getDocsRoute.get("/", async (c) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        // On exclut les admins par exemple (si username = 'admin')
        const docs = await userRepo.find({
            where: { username: Not("admin") }, // si tu importes Not de typeorm
            select: ["users_id", "username", "speciality", "adress"],
        });
        return c.json(docs);
    } catch (err) {
        return c.json({ error: "Erreur serveur lors de la récupération des médecins" }, 500);
    }
});
