import styles from "./ReviewForm.module.scss";
import { useState } from "react";
import { Rating } from "../../ui/Rating";


// Form for submitting a new review
export const ReviewForm = ({ onSubmit }: any) => {

  const [form, setForm] = useState({
    name: "",
    rating: 1,
    comment: "",
  });

  // Max comment length for validation and character counter
  const commentLength = 60;

  const [errors, setErrors] = useState<{
    name?: string;
    comment?: string;
  }>({});

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const validate = () => {
    const errs: typeof errors = {};

    if (form.name.length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    if (form.comment.length < 5) {
      errs.comment = "Comment must be at least 5 characters";
    }

    if (form.comment.length > commentLength) {
      errs.comment = `Comment must be ${commentLength} characters or less`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setSubmitStatus("error");
      setSubmitMessage("Please complete all required fields *.");
      return;
    }

    setSubmitStatus("submitting");
    setSubmitMessage("");

    try {
      await onSubmit(form);

      setForm({ name: "", rating: 1, comment: "" });
      setErrors({});

      setSubmitStatus("success");
      setSubmitMessage("Review submitted successfully.");

      window.setTimeout(() => {
        setSubmitStatus("idle");
        setSubmitMessage("");
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Failed to submit review. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.grid}>
        <div className={styles.left}>
          {/* Name Field */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              Name <span className={styles.required} aria-hidden="true">*</span>
            </label>

            <input
              id="name"
              name="name"
              aria-label="Name"
              className={styles.input}
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />

            {errors.name && (
              <p id="name-error" className={styles.error} role="alert" aria-live="assertive">
                {errors.name}
              </p>
            )}
          </div>

          {/* Rating Field */}
          <div className={styles.field}>
            <label className={styles.label}>How was your experience?</label>

            <div role="group" aria-label="Star rating input">
              <Rating
                value={form.rating}
                onChange={(val) =>
                  setForm({ ...form, rating: val })
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {/* Comment Field */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor="comment">
              Comment <span className={styles.required} aria-hidden="true">*</span>
            </label>

            <textarea
              id="comment"
              name="comment"
              aria-label="Comment"
              className={styles.textarea}
              value={form.comment}
              onChange={(e) =>
                setForm({
                  ...form,
                  comment: e.target.value.slice(0, commentLength),
                })
              }
              maxLength={commentLength}
              aria-required="true"
              aria-invalid={!!errors.comment}
              aria-describedby={errors.comment ? "comment-error" : "comment-help"}
            />

            {/* Character counter*/}
            <div id="comment-help" className={styles.helperText}>
              {form.comment.length}/{commentLength} characters
            </div>

            {errors.comment && (
              <p id="comment-error" className={styles.error} role="alert" aria-live="assertive">
                {errors.comment}
              </p>
            )}
          </div>
        </div>
      </div>

      {(submitStatus === "success" || submitStatus === "error") && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="submit-modal-title">
          <div className={styles.modalContent}>
            <h2 id="submit-modal-title" className={styles.modalTitle}>
              {submitStatus === "success" ? "Success" : "Submission issue"}
            </h2>

            <p className={styles.modalMessage}>{submitMessage}</p>

            <button
              type="button"
              className={styles.modalClose}
              onClick={() => {
                setSubmitStatus("idle");
                setSubmitMessage("");
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <button
        type="submit"
        className={styles.button}
        disabled={submitStatus === "submitting"}
      >
        {submitStatus === "submitting" ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};