import styles from "./App.module.scss";
import { useReviews } from "./hooks/useReviews";
import { ReviewList } from "./components/reviews/list/ReviewList";
import { ReviewForm } from "./components/reviews/form/ReviewForm";

function App() {
  const { reviews, loading, error, addReview } = useReviews();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Customer Reviews</h1>

        <ReviewForm onSubmit={addReview} />

        {/* Loading state */}
        {loading && (
          <p className={styles.loading} role="status" aria-live="polite">
            Loading reviews...
          </p>
        )}

        {/* Error state */}
        {error && (
          <p className={styles.error} role="alert" aria-live="assertive">
            {error}
          </p>
        )}

        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}

export default App;