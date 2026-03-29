import { ReviewRepository } from "./review.repository";
import { Review } from "@shared/types/review";

// Service for handling business logic related to reviews
export const ReviewService = {
  getAll(): Review[] {
    return ReviewRepository.getAll();
  },
// Create a new review by generating an ID and timestamp, then saving it to the repository
  create(data: Omit<Review, "id" | "createdAt">): Review {
    const newReview: Review = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...data,
    };

    return ReviewRepository.create(newReview);
  },
};