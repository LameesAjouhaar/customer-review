import app from "./app";
import { ReviewController } from "./modules/reviews/review.controller";

// Register review routes
app.get("/reviews", ReviewController.getAll);
app.post("/reviews", ReviewController.create);

// Start the server on port 5000
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});