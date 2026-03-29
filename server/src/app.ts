import express from "express";
import { corsMiddleware } from "./config/cors";

// Main application setup
const app = express();

app.use(corsMiddleware);
app.use(express.json());

export default app;