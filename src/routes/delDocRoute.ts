import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { User } from "../entity/User";

export const delDocRoute = new Hono();

delDocRoute.delete("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ users_id: id });
    if (!user) return c.json({ error: "Utilisateur non trouvé" }, 404);

    await userRepo.remove(user);
    return c.json({ message: "Utilisateur supprimé" });
});
