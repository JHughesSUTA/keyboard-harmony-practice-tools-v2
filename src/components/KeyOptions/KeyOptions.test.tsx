import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import KeyOptions from "./KeyOptions";
import { initialKeyOptions } from "../../data/keyOptionData";

// Mock the useOptions hook to avoid sessionStorage dependencies
vi.mock("../../hooks/useOptions", () => ({
  default: vi.fn(() => ({ options: initialKeyOptions, toggleActive: vi.fn() })),
}));

describe("KeyOptions", () => {
  beforeEach(() => {
    // Clear sessionStorage to ensure clean state
    sessionStorage.clear();
  });

  // Clean up DOM after each test
  afterEach(() => {
    cleanup();
  });

  it("renders all key options from initial data", () => {
    render(<KeyOptions />);

    // Verify that we have the expected number of buttons
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(initialKeyOptions.length);
  });

  it("renders key labels correctly", () => {
    render(<KeyOptions />);

    // Test a few key labels to ensure data is being passed correctly
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText("G")).toBeInTheDocument();
    expect(screen.getByText("F♯")).toBeInTheDocument(); // Testing unicode character
  });
});
