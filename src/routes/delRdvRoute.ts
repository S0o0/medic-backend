import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { RendezVous } from "../entity/RendezVous";

export const delRdvRoute = new Hono();

delRdvRoute.delete("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const rdvRepo = AppDataSource.getRepository(RendezVous);

    const rdv = await rdvRepo.findOneBy({ id });
    if (!rdv) return c.json({ error: "Rendez-vous non trouvé" }, 404);

    await rdvRepo.remove(rdv);
    return c.json({ message: "Rendez-vous supprimé" });
});
