import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { Information } from "../entity/Information";

export const delInfoRoute = new Hono();

delInfoRoute.delete("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const infoRepo = AppDataSource.getRepository(Information);

    const info = await infoRepo.findOneBy({ id });
    if (!info) return c.json({ error: "Info non trouvée" }, 404);

    await infoRepo.remove(info);
    return c.json({ message: "Info supprimée" });
});
