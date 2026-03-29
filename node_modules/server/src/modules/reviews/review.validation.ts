// Validation logic for review input data

export const validateReviewInput = (data: any) => {
  const errors: string[] = [];
  
// Validate name, rating, and comment fields with specific rules
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (typeof data.rating !== "number" || data.rating < 1 || data.rating > 5) {
    errors.push("Rating must be between 1 and 5");
  }

  if (!data.comment || data.comment.trim().length < 5) {
    errors.push("Comment must be at least 5 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};