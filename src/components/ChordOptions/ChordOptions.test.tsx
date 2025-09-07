import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import ChordOptions from "../ChordOptions/ChordOptions";
import { initialChordOptions } from "../../data/chordOptionData";

vi.mock("../../hooks/useOptions", () => ({
  default: vi.fn(() => ({
    options: initialChordOptions,
    toggleActive: vi.fn(),
  })),
}));

describe("ChordOptions", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders all chord options from initial data", () => {
    render(<ChordOptions />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(initialChordOptions.length);
  });

  it("renders chord labels correctly", () => {
    render(<ChordOptions />);

    expect(screen.getByText("M7")).toBeInTheDocument();
    expect(screen.getByText("7alt")).toBeInTheDocument();
    expect(screen.getByText("m7(♭5)")).toBeInTheDocument();
    expect(screen.getByText("°7")).toBeInTheDocument();
  });
});
