import cors from "cors";

// CORS middleware configuration
export const corsMiddleware = cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});