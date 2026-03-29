import styles from "./ReviewCard.module.scss";
import type { Review } from "@shared/src/types/review";

// Component to display individual review cards
export const ReviewCard = ({ review }: { review: Review }) => {

  // Destructure review properties for easier access
  const { name, comment, rating } = review;
  const titleId = `review-${String(name).replace(/\s+/g, "-").toLowerCase()}-title`;

  return (
    <article
      className={styles.card}
      aria-labelledby={titleId}
    >
      {/* Reviewer Name */}
      <h3
        id={titleId}
        className={styles.name}
      >
        {name}
      </h3>

      {/* Review Comment */}
      <p className={styles.comment}>
        {comment}
      </p>

      {/* Accessible Rating */}
      <div
        className={styles.rating}
        role="img"
        aria-label={`Rating: ${rating} out of 5 stars`}
      >
        <span aria-hidden="true">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </span>
      </div>
    </article>
  );
};