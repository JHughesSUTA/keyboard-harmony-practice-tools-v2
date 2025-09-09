import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import KeyOptions from "./KeyOptions";
import { initialKeyOptions } from "../../data/keyOptionData";

describe("KeyOptions", () => {
  // Mock toggleActive function
  const mockToggleActive = vi.fn();

  beforeEach(() => {
    mockToggleActive.mockClear();
  });

  // Clean up DOM after each test
  afterEach(() => {
    cleanup();
  });

  it("renders all key options from initial data", () => {
    render(
      <KeyOptions options={initialKeyOptions} toggleActive={mockToggleActive} />
    );

    // Verify that we have the expected number of buttons
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(initialKeyOptions.length);
  });

  it("renders key labels correctly", () => {
    render(
      <KeyOptions options={initialKeyOptions} toggleActive={mockToggleActive} />
    );

    // Test a few key labels to ensure data is being passed correctly
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText("G")).toBeInTheDocument();
    expect(screen.getByText("F♯")).toBeInTheDocument(); // Testing unicode character
  });
});
