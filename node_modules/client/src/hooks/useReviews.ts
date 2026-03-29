import { useEffect, useState } from "react";
import type { Review } from "@shared/src/types/review";
import { ReviewService } from "../services/review.service";

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await ReviewService.getAll();
      setReviews(data);
    } catch (err) {
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  // Add a new review
  const addReview = async (
    data: Omit<Review, "id" | "createdAt">
  ): Promise<Review | undefined> => {
    try {
      setError(null);

      const newReview = await ReviewService.create(data);

      // Optimistic UI update (instant feedback)
      setReviews(prev => [newReview, ...prev]);

      return newReview;
    } catch (err) {
      setError("Failed to submit review");
      return undefined;
    }
  };

  // Load on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    loading,
    error,
    addReview,
    refetch: fetchReviews, 
  };
};