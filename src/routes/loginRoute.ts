// src/routes/loginRoute.ts
import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";

export const loginRoute = new Hono();

loginRoute.post("/", async (c) => {
    try {
        const { email, password } = await c.req.json();

        if (!email || !password) {
            return c.text("Email et mot de passe requis", 400);
        }

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { email } });

        if (!user) {
            return c.text("Email incorrect", 401);
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return c.text("Mot de passe incorrect", 401);
        }

        return c.json({
            id: user.users_id,
            username: user.username,
            email: user.email,
        });

    } catch (err) {
        console.error("Erreur lors du login :", err);
        return c.text("Erreur serveur: " + (err instanceof Error ? err.message : String(err)), 500);
    }
});
