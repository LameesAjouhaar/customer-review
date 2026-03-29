import axios from "axios";
import { ReviewService } from "./review.service";
import { vi } from "vitest";

// Mock axios
vi.mock("axios");

describe("ReviewService", () => {
  const mockReviews = [
    {
      id: "1",
      name: "John",
      comment: "Great!",
      rating: 5,
      createdAt: "2024-01-01",
    },
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches all reviews (getAll)", async () => {
    (axios.get as any).mockResolvedValue({
      data: mockReviews,
    });

    const result = await ReviewService.getAll();

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/reviews")
    );

    expect(result).toEqual(mockReviews);
  });

  it("creates a new review (create)", async () => {
    const newReview = {
      id: "2",
      name: "Jane",
      comment: "Nice",
      rating: 4,
      createdAt: "2024-01-02",
    };

    const input = {
      name: "Jane",
      comment: "Nice",
      rating: 4,
    };

    (axios.post as any).mockResolvedValue({
      data: newReview,
    });

    const result = await ReviewService.create(input);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/reviews"),
      input
    );

    expect(result).toEqual(newReview);
  });
});