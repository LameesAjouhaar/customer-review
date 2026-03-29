import { render, screen } from "@testing-library/react";
import { ReviewCard } from "./ReviewCard";
import type { Review } from "@shared/src/types/review";

describe("ReviewCard", () => {
 const mockReview: Review = {
  id: "1",
  name: "John Doe",
  comment: "Great product!",
  rating: 4,
  createdAt: new Date().toISOString(),
};

  it("renders reviewer name", () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders review comment", () => {
    render(<ReviewCard review={mockReview} />);
    expect(screen.getByText("Great product!")).toBeInTheDocument();
  });

  it("renders accessible rating label", () => {
    render(<ReviewCard review={mockReview} />);
    expect(
      screen.getByLabelText("Rating: 4 out of 5 stars")
    ).toBeInTheDocument();
  });

  it("renders correct number of stars visually", () => {
    render(<ReviewCard review={mockReview} />);
    const stars = screen.getByText("★★★★☆");
    expect(stars).toBeInTheDocument();
  });

  it("uses semantic structure (article + heading)", () => {
    render(<ReviewCard review={mockReview} />);
    
    const article = screen.getByRole("article");
    const heading = screen.getByRole("heading", {
      name: "John Doe",
    });

    expect(article).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});