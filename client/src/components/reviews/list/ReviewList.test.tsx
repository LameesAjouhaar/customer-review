import { render, screen } from "@testing-library/react";
import { ReviewList } from "./ReviewList";
import type { Review } from "@shared/src/types/review";

describe("ReviewList", () => {
  const mockReviews: Review[] = [
    {
      id: "1",
      name: "John Doe",
      comment: "Great product!",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Jane Smith",
      comment: "Pretty good",
      rating: 4,
      createdAt: new Date().toISOString(),
    },
  ];

  it("shows empty state when no reviews exist", () => {
    render(<ReviewList reviews={[]} />);

    const emptyState = screen.getByRole("status");

    expect(emptyState).toBeInTheDocument();
    expect(emptyState).toHaveTextContent("No reviews yet");
  });

  it("renders list with correct accessibility role", () => {
    render(<ReviewList reviews={mockReviews} />);

    const list = screen.getByRole("list", {
      name: "Customer reviews",
    });

    expect(list).toBeInTheDocument();
  });

  it("renders all review cards", () => {
    render(<ReviewList reviews={mockReviews} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();

    expect(screen.getByText("Great product!")).toBeInTheDocument();
    expect(screen.getByText("Pretty good")).toBeInTheDocument();
  });
});