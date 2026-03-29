import axios from "axios";
import type { Review } from "@shared/src/types/review";

// Base URL for the reviews API, using environment variable for flexibility
const API_URL = `${import.meta.env.VITE_API_URL}/reviews`;

// Service for handling API calls related to reviews

export const ReviewService = {
    // Fetch all reviews from the server
  async getAll(): Promise<Review[]> {
    const response = await axios.get<Review[]>(API_URL);
    return response.data;
  },

  // Create a new review by sending a POST request to the server
  async create(
    data: Omit<Review, "id" | "createdAt">
  ): Promise<Review> {
    const response = await axios.post<Review>(API_URL, data);
    return response.data;
  },
};