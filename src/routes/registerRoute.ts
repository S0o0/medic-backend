// src/routes/registerRoute.ts
import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";

export const registerRoute = new Hono();

registerRoute.post("/", async (c) => {
    const { username, email, password, speciality, adress } = await c.req.json();

    if (!username || !email || !password) {
        return c.text("Champs requis : username, email, password", 400);
    }

    const userRepo = AppDataSource.getRepository(User);

    // Vérifie si un utilisateur existe déjà avec cet email
    const existing = await userRepo.findOne({ where: { email } });
    if (existing) {
        return c.json({ error: "Email déjà utilisé" }, 400);
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepo.create({
        username,
        email,
        password: hashedPassword,
        speciality,
        adress,
    });

    await userRepo.save(user);

    return c.json({ success: true, userId: user.users_id }, 201);
});
