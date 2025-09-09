import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ChordOptions from "./ChordOptions";
import { initialChordOptions } from "../../data/chordOptionData";

describe("ChordOptions", () => {
  // Mock toggleActive function
  const mockToggleActive = vi.fn();

  beforeEach(() => {
    mockToggleActive.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders all chord options from initial data", () => {
    render(
      <ChordOptions
        options={initialChordOptions}
        toggleActive={mockToggleActive}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(initialChordOptions.length);
  });

  it("renders chord labels correctly", () => {
    render(
      <ChordOptions
        options={initialChordOptions}
        toggleActive={mockToggleActive}
      />
    );

    expect(screen.getByText("M7")).toBeInTheDocument();
    expect(screen.getByText("7alt")).toBeInTheDocument();
    expect(screen.getByText("m7(♭5)")).toBeInTheDocument();
    expect(screen.getByText("°7")).toBeInTheDocument();
  });
});
