import styles from "./ReviewList.module.scss";
import { ReviewCard } from "../card/ReviewCard";
import type { Review } from "@shared/src/types/review";

// Component to display a list of reviews
export const ReviewList = ({ reviews }: { reviews: Review[] }) => {

  // If there are no reviews, show a friendly message
  if (!reviews.length) {
    return <p role="status" aria-live="polite">No reviews yet</p>;
  }

  return (
    // Each Review Card will be rendered as a list item within this structure
    <div className={styles.grid}
     role="list"
      aria-label="Customer reviews">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};