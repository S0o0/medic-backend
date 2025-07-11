import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { User } from "../entity/User";

export const edDocRoute = new Hono();

edDocRoute.put("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const data = await c.req.json();

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ users_id: id });
    if (!user) return c.json({ error: "Utilisateur non trouvé" }, 404);

    userRepo.merge(user, data);
    const updated = await userRepo.save(user);

    return c.json(updated);
});
