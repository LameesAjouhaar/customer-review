import { render, screen, fireEvent } from "@testing-library/react";
import { Rating } from "./Rating";
import { vi } from "vitest";

describe("Rating component", () => {
  it("renders 5 stars with correct aria roles", () => {
    render(<Rating value={3} onChange={() => {}} />);

    const group = screen.getByRole("radiogroup", {
      name: "Star rating",
    });

    expect(group).toBeInTheDocument();

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(5);
  });

  it("sets correct aria-checked state", () => {
    render(<Rating value={2} onChange={() => {}} />);

    const radios = screen.getAllByRole("radio");

    expect(radios[1]).toHaveAttribute("aria-checked", "true");
    expect(radios[0]).toHaveAttribute("aria-checked", "false");
  });

  it("calls onChange when a star is clicked", () => {
    const onChange = vi.fn();

    render(<Rating value={0} onChange={onChange} />);

    const thirdStar = screen.getAllByRole("radio")[2];

    fireEvent.click(thirdStar);

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("supports ArrowRight keyboard interaction", () => {
    const onChange = vi.fn();

    render(<Rating value={2} onChange={onChange} />);

    const secondStar = screen.getAllByRole("radio")[1];

    fireEvent.keyDown(secondStar, { key: "ArrowRight" });

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("supports ArrowLeft keyboard interaction", () => {
    const onChange = vi.fn();

    render(<Rating value={3} onChange={onChange} />);

    const thirdStar = screen.getAllByRole("radio")[2];

    fireEvent.keyDown(thirdStar, { key: "ArrowLeft" });

    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("supports Enter key selection", () => {
    const onChange = vi.fn();

    render(<Rating value={0} onChange={onChange} />);

    const firstStar = screen.getAllByRole("radio")[0];

    fireEvent.keyDown(firstStar, { key: "Enter" });

    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("supports Space key selection", () => {
    const onChange = vi.fn();

    render(<Rating value={0} onChange={onChange} />);

    const firstStar = screen.getAllByRole("radio")[0];

    fireEvent.keyDown(firstStar, { key: " " });

    expect(onChange).toHaveBeenCalledWith(1);
  });
});