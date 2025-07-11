import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { Information } from "../entity/Information";

export const edInfoRoute = new Hono();

edInfoRoute.put("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const data = await c.req.json();

    const infoRepo = AppDataSource.getRepository(Information);
    const info = await infoRepo.findOneBy({ id });
    if (!info) return c.json({ error: "Info non trouvée" }, 404);

    infoRepo.merge(info, data);
    const updated = await infoRepo.save(info);

    return c.json(updated);
});