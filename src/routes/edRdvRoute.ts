import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { RendezVous } from "../entity/RendezVous";

export const edRdvRoute = new Hono();

edRdvRoute.put("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const data = await c.req.json();

    const rdvRepo = AppDataSource.getRepository(RendezVous);
    const rdv = await rdvRepo.findOneBy({ id });
    if (!rdv) return c.json({ error: "Rendez-vous non trouvé" }, 404);

    rdvRepo.merge(rdv, data);
    const updated = await rdvRepo.save(rdv);

    return c.json(updated);
});