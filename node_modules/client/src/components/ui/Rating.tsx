import styles from "./Rating.module.scss";
import { useState } from "react";


// Accessible star rating component
export const Rating = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) => {
  const [hover, setHover] = useState<number | null>(null);

  // Render 5 stars, each as a button for accessibility
  return (
    <div
      className={styles.stars}
      role="radiogroup"
      aria-label="Star rating"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = (hover ?? value) >= star;

        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            tabIndex={value === star ? 0 : -1}
            onClick={() => onChange(star)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" && star < 5) {
                onChange(star + 1);
              }
              if (e.key === "ArrowLeft" && star > 1) {
                onChange(star - 1);
              }
              if (e.key === "Enter" || e.key === " ") {
                onChange(star);
              }
            }}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            className={`${styles.star} ${isActive ? styles.active : ""}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};