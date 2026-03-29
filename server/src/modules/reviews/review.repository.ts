import { Review } from "@shared/types/review";
import { readJSON, writeJSON } from "../../utils/fileDB";

const DB_PATH = "src/data/reviews.json";

// Repository for managing review data
export const ReviewRepository = {
  
  getAll(): Review[] {
    return readJSON<Review[]>(DB_PATH);
  },
// Create a new review and save it to the JSON file
  create(review: Review): Review {
    const data = readJSON<Review[]>(DB_PATH);
    data.unshift(review);
    writeJSON(DB_PATH, data);
    return review;
  },
};