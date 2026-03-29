import { renderHook, waitFor, act } from "@testing-library/react";
import { useReviews } from "./useReviews";
import { ReviewService } from "../services/review.service";
import { vi } from "vitest";

// Mock service layer
vi.mock("../services/review.service");

describe("useReviews hook", () => {
  const mockReviews = [
    {
      id: "1",
      name: "John",
      comment: "Great!",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches reviews on mount", async () => {
    (ReviewService.getAll as any).mockResolvedValue(mockReviews);

    const { result } = renderHook(() => useReviews());

    await waitFor(() => {
      expect(result.current.reviews).toEqual(mockReviews);
    });

    expect(result.current.loading).toBe(false);
  });

  it("sets loading state during fetch", async () => {
    let resolveFn: any;

    (ReviewService.getAll as any).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFn = resolve;
        })
    );

    const { result } = renderHook(() => useReviews());

    expect(result.current.loading).toBe(true);

    act(() => {
      resolveFn(mockReviews);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("handles fetch error", async () => {
    (ReviewService.getAll as any).mockRejectedValue(
      new Error("API error")
    );

    const { result } = renderHook(() => useReviews());

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to load reviews");
    });
  });

  it("adds a review optimistically", async () => {
    const newReview = {
      id: "2",
      name: "Jane",
      comment: "Nice",
      rating: 4,
      createdAt: new Date().toISOString(),
    };

    (ReviewService.getAll as any).mockResolvedValue([]);
    (ReviewService.create as any).mockResolvedValue(newReview);

    const { result } = renderHook(() => useReviews());

    await waitFor(() => {
      expect(result.current.reviews).toEqual([]);
    });

    await act(async () => {
      await result.current.addReview({
        name: "Jane",
        comment: "Nice",
        rating: 4,
      });
    });

    expect(result.current.reviews[0]).toEqual(newReview);
  });

  it("handles add review error", async () => {
    (ReviewService.getAll as any).mockResolvedValue([]);
    (ReviewService.create as any).mockRejectedValue(
      new Error("Create failed")
    );

    const { result } = renderHook(() => useReviews());

    await act(async () => {
      await result.current.addReview({
        name: "Jane",
        comment: "Nice",
        rating: 4,
      });
    });

    expect(result.current.error).toBe("Failed to submit review");
  });
});