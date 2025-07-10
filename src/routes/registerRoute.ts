// src/routes/registerRoute.ts
import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";

export const registerRoute = new Hono();

registerRoute.post("/", async (c) => {
    const { username, password } = await c.req.json();
    const userRepo = AppDataSource.getRepository(User);

    const existing = await userRepo.findOne({ where: { username } });
    if (existing) return c.json({ error: "Username already exists" }, 400);

    const hash = await bcrypt.hash(password, 10);
    const user = userRepo.create({ username, password: hash });
    await userRepo.save(user);

    return c.json({ success: true }, 201);
});