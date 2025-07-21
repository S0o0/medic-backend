// src/index.ts
import "reflect-metadata";
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { config } from 'dotenv';
import { AppDataSource } from './datasource';

import { loginRoute } from './routes/loginRoute';

import { addDocRoute } from "./routes/addDocRoute";
import { delDocRoute } from "./routes/delDocRoute";
import { edDocRoute } from "./routes/edDocRoute";

import { addInfoRoute } from "./routes/addInfoRoute";
import { delInfoRoute } from "./routes/delInfoRoute";
import { edInfoRoute } from "./routes/edInfoRoute";

import { addRdvRoute } from "./routes/addRdvRoute";
import { delRdvRoute } from "./routes/delRdvRoute";
import { edRdvRoute } from "./routes/edRdvRoute";

import { getDocsRoute } from "./routes/getDocsRoute";



// Charger les variables d'environnement (.env)
config();

// Initialiser la connexion à la base MySQL via TypeORM
AppDataSource.initialize()
    .then(() => console.log("✅ Database connected using TypeORM"))
    .catch((error) => console.error("❌ DB Connection Error:", error));

const app = new Hono();

// Configuration CORS pour accepter les requêtes du frontend
app.use('*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
}));

// Test simple
app.get('/ping', (c) => c.text('pong'));

// Routes d'authentification
app.route('/login', loginRoute);

// Routes BDD
// Médecins
app.route("/add_doc", addDocRoute);
app.route("/del_doc", delDocRoute);
app.route("/ed_doc", edDocRoute);
app.route("/get_docs", getDocsRoute);

// Infos
app.route("/add_info", addInfoRoute);
app.route("/del_info", delInfoRoute);
app.route("/ed_info", edInfoRoute);

// Rdv
app.route("/add_rdv", addRdvRoute);
app.route("/del_rdv", delRdvRoute);
app.route("/ed_rdv", edRdvRoute);



// Démarrage du serveur
const port = parseInt(process.env.PORT || '4000', 10);
console.log(`🚀 Server running on http://localhost:${port}`);

Bun.serve({
    port,
    fetch: app.fetch,
});