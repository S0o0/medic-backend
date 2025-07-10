// src/index.ts
import "reflect-metadata";
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { config } from 'dotenv';
import { AppDataSource } from './datasource';
import { loginRoute } from './routes/loginRoute';
import { registerRoute } from './routes/registerRoute';

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
app.route('/register', registerRoute);

// Démarrage du serveur
const port = parseInt(process.env.PORT || '4000', 10);
console.log(`🚀 Server running on http://localhost:${port}`);

Bun.serve({
    port,
    fetch: app.fetch,
});