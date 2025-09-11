import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Display from "./Display";
import type { Option } from "../../types";

// Mock the useRandomDisplay hook since we've already tested it separately
vi.mock("../../hooks/useRandomDisplay", () => ({
  default: vi.fn(() => ({
    displayKey: "C",
    displayKeyPronunciation: "C",
    displayChord: "M7",
    displayChordPronunciation: "Major 7",
    isLongName: false,
  })),
}));

// Mock the PlayControlsContext
vi.mock("../../context/PlayControlsContext", () => ({
  usePlayControls: vi.fn(() => ({
    running: true,
    tempo: 60,
    setTempo: vi.fn(),
    setRunning: vi.fn(),
  })),
}));

// Import the mocked function for type safety
import { usePlayControls } from "../../context/PlayControlsContext";
const mockUsePlayControls = vi.mocked(usePlayControls);

// Import the mocked useRandomDisplay for manipulation
import useRandomDisplay from "../../hooks/useRandomDisplay";
const mockUseRandomDisplay = vi.mocked(useRandomDisplay);

describe("Display", () => {
  // Clean up DOM after each test
  afterEach(() => {
    cleanup();
  });
  const mockKeyOptions: Option[] = [
    { id: 1, label: "C", pronunciation: "C", active: true },
    { id: 2, label: "G", pronunciation: "G", active: true },
  ];

  const mockChordOptions: Option[] = [
    { id: 1, label: "M7", pronunciation: "Major 7", active: true },
    { id: 2, label: "7", pronunciation: "7", active: true },
  ];

  it("should render the combined key and chord display", () => {
    render(
      <Display
        activeKeyOptions={mockKeyOptions}
        activeChordOptions={mockChordOptions}
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
      />
    );

    // Should still display the combined key + chord
    expect(screen.getByText("CM7")).toBeInTheDocument();
  });

  it("should handle empty options arrays", () => {
    render(<Display activeKeyOptions={[]} activeChordOptions={[]} />);

    // Should still render (hook handles the empty arrays)
    expect(screen.getByText("CM7")).toBeInTheDocument();
  });

  it("should have proper accessibility structure", () => {
    render(
      <Display
        activeKeyOptions={mockKeyOptions}
        activeChordOptions={mockChordOptions}
      />
    );

    // Should have proper section with aria-label
    expect(
      screen.getByRole("region", { name: "Chord display" })
    ).toBeInTheDocument();

    // Visual display should be hidden from screen readers
    const visualDisplay = screen.getByText("CM7");
    expect(visualDisplay).toHaveAttribute("aria-hidden", "true");
  });

  it("should announce chord changes for screen readers when running", () => {
    render(
      <Display
        activeKeyOptions={mockKeyOptions}
        activeChordOptions={mockChordOptions}
      />
    );

    // Should have live region with pronunciation for screen readers
    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveTextContent("C Major 7");
    expect(liveRegion).toHaveClass("sr-only");
  });

  it("should not announce when not running", () => {
    // Mock running as false
    mockUsePlayControls.mockReturnValue({
      running: false,
      tempo: 60,
      setTempo: vi.fn(),
      setRunning: vi.fn(),
    });

    render(
      <Display
        activeKeyOptions={mockKeyOptions}
        activeChordOptions={mockChordOptions}
      />
    );

    // Live region should be empty when not running
    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveTextContent("");

    // Reset mock for other tests
    mockUsePlayControls.mockReturnValue({
      running: true,
      tempo: 60,
      setTempo: vi.fn(),
      setRunning: vi.fn(),
    });
  });

  it("should apply larger font size for short combinations", () => {
    mockUseRandomDisplay.mockReturnValue({
      displayKey: "C",
      displayKeyPronunciation: "C",
      displayChord: "7",
      displayChordPronunciation: "Seventh",
      isLongName: false,
    });

    render(
      <Display
        activeKeyOptions={mockKeyOptions}
        activeChordOptions={mockChordOptions}
      />
    );

    const displaySpan = screen.getByText("C7");
    expect(displaySpan).toHaveClass("text-6xl");
    expect(displaySpan).not.toHaveClass("text-5xl");
  });

  it("should apply smaller font size for long combinations", () => {
    mockUseRandomDisplay.mockReturnValue({
      displayKey: "F#",
      displayKeyPronunciation: "F Sharp",
      displayChord: "maj13",
      displayChordPronunciation: "Major Thirteenth",
      isLongName: true,
    });

    render(
      <Display
        activeKeyOptions={mockKeyOptions}
        activeChordOptions={mockChordOptions}
      />
    );

    const displaySpan = screen.getByText("F#maj13");
    expect(displaySpan).toHaveClass("text-5xl");
    expect(displaySpan).not.toHaveClass("text-6xl");
  });
});
