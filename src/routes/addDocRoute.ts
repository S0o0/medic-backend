import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";

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

    // Hachage du mot de passe avant la sauvegarde
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepo.create({ 
        username, 
        email, 
        password: hashedPassword,  // stocke le hash ici
        speciality, 
        adress 
    });

    await userRepo.save(newUser);

    return c.json(newUser);
});