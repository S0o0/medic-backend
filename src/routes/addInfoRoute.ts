import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { Information } from "../entity/Information";

export const addInfoRoute = new Hono();

addInfoRoute.post("/", async (c) => {
    const { title, description } = await c.req.json();

    if (!title || !description) {
        return c.json({ error: "Champs obligatoires manquants" }, 400);
    }

    const infoRepo = AppDataSource.getRepository(Information);
    const newInfo = infoRepo.create({ title, description });
    await infoRepo.save(newInfo);

    return c.json(newInfo);
});