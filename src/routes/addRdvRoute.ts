import { Hono } from "hono";
import { AppDataSource } from "../datasource";
import { RendezVous } from "../entity/RendezVous";
import { User } from "../entity/User";

export const addRdvRoute = new Hono();

addRdvRoute.post("/", async (c) => {
    const {
        patient_nom,
        patient_prenom,
        patient_tel,
        num_secu,
        doctor_id,
        date,
    } = await c.req.json();

    if (
        !patient_nom ||
        !patient_prenom ||
        !patient_tel ||
        !num_secu ||
        !doctor_id ||
        !date
    ) {
        return c.json({ error: "Champs manquants" }, 400);
    }

    const doctor = await AppDataSource.getRepository(User).findOneBy({ users_id: doctor_id });

    if (!doctor) {
        return c.json({ error: "Médecin introuvable" }, 404);
    }

    const rdvRepo = AppDataSource.getRepository(RendezVous);

    const newRdv = rdvRepo.create({
        patient_nom,
        patient_prenom,
        patient_tel,
        num_secu,
        doctor,
        date: new Date(date),
    });

    try {
        const saved = await rdvRepo.save(newRdv);
        return c.json(saved);
    } catch (e) {
        return c.json({ error: "Erreur lors de l'ajout du rendez-vous" }, 500);
    }
});
