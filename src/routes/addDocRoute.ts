import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { User } from "../entity/User";

export const addDocRoute = new Hono();

addDocRoute.post("/", async (c) => {
    const { username, email, password, speciality, adress } = await c.req.json();

    if (!username || !email || !password) {
        return c.json({ error: "Champs obligatoires manquants" }, 400);
    }

    const userRepo = AppDataSource.getRepository(User);

    const userExists = await userRepo.findOneBy({ email });
    if (userExists) {
        return c.json({ error: "Utilisateur déjà existant" }, 409);
    }

    const newUser = userRepo.create({ username, email, password, speciality, adress });
    await userRepo.save(newUser);

    return c.json(newUser);
});
