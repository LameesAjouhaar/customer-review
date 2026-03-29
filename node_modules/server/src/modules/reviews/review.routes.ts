import express from "express";
import { ReviewController } from "./review.controller";

// Router for review related endpoints
const router = express.Router();

// Register routes for getting all reviews and creating a new review
router.get("/", ReviewController.getAll);
router.post("/", ReviewController.create);

export default router;