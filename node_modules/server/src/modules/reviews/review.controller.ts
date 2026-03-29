import { Request, Response } from "express";
import { ReviewService } from "./review.service";

// Controller for handling review related requests
export const ReviewController = {
  // Get all reviews and return them as JSON
  getAll: (_: Request, res: Response) => {
    const reviews = ReviewService.getAll();
    res.json(reviews);
  },

  // Create a new review using the data from the request body and return the created review as JSON
  create: (req: Request, res: Response) => {
    const review = ReviewService.create(req.body);

    res.status(201).json(review);
  },
};