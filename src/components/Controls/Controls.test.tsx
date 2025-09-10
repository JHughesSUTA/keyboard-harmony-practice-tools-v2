import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Controls from "./Controls";

// Mock child components since we're only testing the Controls layout
vi.mock("../StartButton/StartButton", () => ({
  default: () => <div data-testid="start-button">Start Button</div>,
}));

vi.mock("../TempoSlider/TempoSlider", () => ({
  default: () => <div data-testid="tempo-slider">Tempo Slider</div>,
}));

describe("Controls", () => {
  it("should render without crashing", () => {
    expect(() => render(<Controls />)).not.toThrow();
  });

  it("should render both child components", () => {
    render(<Controls />);

    expect(screen.getByTestId("tempo-slider")).toBeInTheDocument();
    expect(screen.getByTestId("start-button")).toBeInTheDocument();
  });

  it("should have proper layout structure", () => {
    render(<Controls />);

    const section = screen.getByRole("region");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("flex", "justify-between", "py-4");
  });
});
