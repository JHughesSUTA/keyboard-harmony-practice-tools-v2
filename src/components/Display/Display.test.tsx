import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Display from "./Display";
import type { Option } from "../../types";

// Mock the useRandomDisplay hook since we've already tested it separately
vi.mock("../../hooks/useRandomDisplay", () => ({
  default: vi.fn(() => ({
    displayKey: "C",
    displayChord: "M7",
  })),
}));

describe("Display", () => {
  // Clean up DOM after each test
  afterEach(() => {
    cleanup();
  });
  const mockKeyOptions: Option[] = [
    { id: 1, label: "C", active: true },
    { id: 2, label: "G", active: true },
  ];

  const mockChordOptions: Option[] = [
    { id: 1, label: "M7", active: true },
    { id: 2, label: "7", active: true },
  ];

  it("should render the combined key and chord display", () => {
    render(
      <Display
        activeKeyOptions={mockKeyOptions}
        activeChordOptions={mockChordOptions}
        running={true}
      />
    );

    // Should display the combined key + chord from the hook
    expect(screen.getByText("CM7")).toBeInTheDocument();
  });

  it("should render when not running", () => {
    render(
      <Display
        activeKeyOptions={mockKeyOptions}
        activeChordOptions={mockChordOptions}
        running={false}
      />
    );

    // Should still display the combined key + chord
    expect(screen.getByText("CM7")).toBeInTheDocument();
  });

  it("should handle empty options arrays", () => {
    render(
      <Display activeKeyOptions={[]} activeChordOptions={[]} running={true} />
    );

    // Should still render (hook handles the empty arrays)
    expect(screen.getByText("CM7")).toBeInTheDocument();
  });
});
