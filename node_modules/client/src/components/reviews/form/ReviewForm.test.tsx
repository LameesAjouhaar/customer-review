import { render, screen, fireEvent } from "@testing-library/react";
import { ReviewForm } from "./ReviewForm";
import { vi } from "vitest";

describe("ReviewForm", () => {
  const mockSubmit = vi.fn?.() || jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear?.();
  });

  it("renders form fields correctly", () => {
    render(<ReviewForm onSubmit={mockSubmit} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Comment")).toBeInTheDocument();
    expect(screen.getByText("Submit Review")).toBeInTheDocument();
  });

  it("shows validation errors when form is invalid", () => {
    render(<ReviewForm onSubmit={mockSubmit} />);

    fireEvent.click(screen.getByText("Submit Review"));

    expect(
      screen.getAllByText("Name must be at least 2 characters")
    ).toHaveLength(1);

    expect(
      screen.getAllByText("Comment must be at least 5 characters")
    ).toHaveLength(1);

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("submits form when valid data is entered", () => {
    render(<ReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByLabelText("Comment"), {
      target: { value: "Great product!" },
    });

    fireEvent.click(screen.getByLabelText("5 stars"));

    fireEvent.click(screen.getByText("Submit Review"));

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      name: "John",
      comment: "Great product!",
      rating: 5,
    });
  });

  it("resets form after successful submit", async () => {
    mockSubmit.mockResolvedValueOnce(undefined);
    render(<ReviewForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByLabelText("Comment"), {
      target: { value: "Great product!" },
    });

    fireEvent.click(screen.getByText("Submit Review"));

    expect(await screen.findByText("Review submitted successfully.")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Comment")).toHaveValue("");
  });

  it("disables submit button while submitting", async () => {
    let resolve: () => void = () => {};
    const promise = new Promise<void>((r) => { resolve = r; });
    mockSubmit.mockReturnValueOnce(promise);

    render(<ReviewForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Comment"), {
      target: { value: "Great product!" },
    });

    fireEvent.click(screen.getByText("Submit Review"));
    expect(screen.getByText("Submitting...")).toBeInTheDocument();

    resolve();
    await screen.findByText("Review submitted successfully.");
  });

  it("has accessible error container when validation fails", () => {
    render(<ReviewForm onSubmit={mockSubmit} />);

    fireEvent.click(screen.getByText("Submit Review"));

    const errorContainers = screen.getAllByRole("alert");

    expect(errorContainers).toHaveLength(2);
    errorContainers.forEach(container => {
      expect(container).toHaveAttribute("aria-live", "assertive");
    });
  });
});