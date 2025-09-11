import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useRandomDisplay from "./useRandomDisplay";
import type { Option } from "../types";

// Mock the entire PlayControlsContext module
vi.mock("../context/PlayControlsContext", () => ({
  usePlayControls: vi.fn(() => ({
    tempo: 60, // Default tempo for tests
    setTempo: vi.fn(),
    running: true,
    setRunning: vi.fn(),
  })),
}));

// Import the mocked usePlayControls for type safety
import { usePlayControls } from "../context/PlayControlsContext";
const mockusePlayControls = vi.mocked(usePlayControls);

describe("useRandomDisplay", () => {
  // Test data
  const mockKeyOptions: Option[] = [
    { id: 1, label: "C", pronunciation: "C", active: true },
    { id: 2, label: "G", pronunciation: "G", active: true },
    { id: 3, label: "F", pronunciation: "F", active: true },
  ];

  const mockChordOptions: Option[] = [
    { id: 2, label: "7", pronunciation: "Seventh", active: true },
    { id: 1, label: "M7", pronunciation: "Major 7", active: true },
    { id: 3, label: "m7", pronunciation: "Minor 7", active: true },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
    // Reset the mock to default tempo
    mockusePlayControls.mockReturnValue({
      tempo: 60,
      setTempo: vi.fn(),
      running: true,
      setRunning: vi.fn(),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Initialization", () => {
    it("should return default values when not running", () => {
      const { result } = renderHook(() =>
        useRandomDisplay(mockKeyOptions, mockChordOptions, false)
      );

      expect(result.current.displayKey).toBe("C");
      expect(result.current.displayKeyPronunciation).toBe("C");
      expect(result.current.displayChord).toBe("7");
      expect(result.current.displayChordPronunciation).toBe("Seventh");
    });

    it("should return default values initially even when running", () => {
      const { result } = renderHook(() =>
        useRandomDisplay(mockKeyOptions, mockChordOptions, true)
      );

      // Initially should still show defaults
      expect(result.current.displayKey).toBe("C");
      expect(result.current.displayKeyPronunciation).toBe("C");
      expect(result.current.displayChord).toBe("7");
      expect(result.current.displayChordPronunciation).toBe("Seventh");
    });
  });

  describe("Interval behavior", () => {
    it("should update values after interval when running", () => {
      const { result } = renderHook(() =>
        useRandomDisplay(mockKeyOptions, mockChordOptions, true)
      );

      // Fast-forward time by 1 second (60000ms / 60 tempo = 1000ms)
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Should have updated to one of the available options
      expect(["C", "G", "F"]).toContain(result.current.displayKey);
      expect(["C", "G", "F"]).toContain(result.current.displayKeyPronunciation);
      expect(["7", "M7", "m7"]).toContain(result.current.displayChord);
      expect(["Seventh", "Major 7", "Minor 7"]).toContain(
        result.current.displayChordPronunciation
      );
    });

    it("should not update values when not running", () => {
      const { result } = renderHook(() =>
        useRandomDisplay(mockKeyOptions, mockChordOptions, false)
      );

      const initialKey = result.current.displayKey;
      const initialKeyPronunciation = result.current.displayKeyPronunciation;
      const initialChord = result.current.displayChord;
      const initialChordPronunciation =
        result.current.displayChordPronunciation;

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // Values should remain the same
      expect(result.current.displayKey).toBe(initialKey);
      expect(result.current.displayKeyPronunciation).toBe(
        initialKeyPronunciation
      );
      expect(result.current.displayChord).toBe(initialChord);
      expect(result.current.displayChordPronunciation).toBe(
        initialChordPronunciation
      );
    });

    it("should stop updating when running changes to false", () => {
      const { result, rerender } = renderHook(
        ({ running }) =>
          useRandomDisplay(mockKeyOptions, mockChordOptions, running),
        { initialProps: { running: true } }
      );

      // Start interval
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      const keyAfterFirstUpdate = result.current.displayKey;
      const keyPronunciationAfterFirstUpdate =
        result.current.displayKeyPronunciation;
      const chordAfterFirstUpdate = result.current.displayChord;
      const chordPronunciationAfterFirstUpdate =
        result.current.displayChordPronunciation;

      // Stop running
      rerender({ running: false });

      // Advance time more
      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // Values should not have changed after stopping
      expect(result.current.displayKey).toBe(keyAfterFirstUpdate);
      expect(result.current.displayKeyPronunciation).toBe(
        keyPronunciationAfterFirstUpdate
      );
      expect(result.current.displayChord).toBe(chordAfterFirstUpdate);
      expect(result.current.displayChordPronunciation).toBe(
        chordPronunciationAfterFirstUpdate
      );
    });

    it("should respond to tempo changes", () => {
      // Change tempo to 120 (500ms interval)
      mockusePlayControls.mockReturnValue({
        tempo: 120,
        setTempo: vi.fn(),
        running: true,
        setRunning: vi.fn(),
      });

      // Re-render to pick up new tempo
      const { result } = renderHook(() =>
        useRandomDisplay(mockKeyOptions, mockChordOptions, true)
      );

      // Fast-forward by 500ms (new interval: 60000ms / 120 tempo = 500ms)
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Should have updated with faster tempo
      expect(["C", "G", "F"]).toContain(result.current.displayKey);
      expect(["C", "G", "F"]).toContain(result.current.displayKeyPronunciation);
      expect(["7", "M7", "m7"]).toContain(result.current.displayChord);
      expect(["Seventh", "Major 7", "Minor 7"]).toContain(
        result.current.displayChordPronunciation
      );
    });
  });

  describe("Edge cases", () => {
    it("should handle empty key options array", () => {
      const { result } = renderHook(() =>
        useRandomDisplay([], mockChordOptions, true)
      );

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Key should remain default when no options available
      expect(result.current.displayKey).toBe("C");
      expect(result.current.displayKeyPronunciation).toBe("C");
      // Chord should still update
      expect(["7", "M7", "m7"]).toContain(result.current.displayChord);
      expect(["Seventh", "Major 7", "Minor 7"]).toContain(
        result.current.displayChordPronunciation
      );
    });

    it("should handle empty chord options array", () => {
      const { result } = renderHook(() =>
        useRandomDisplay(mockKeyOptions, [], true)
      );

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Key should update
      expect(["C", "G", "F"]).toContain(result.current.displayKey);
      expect(["C", "G", "F"]).toContain(result.current.displayKeyPronunciation);
      // Chord should remain default when no options available
      expect(result.current.displayChord).toBe("7");
      expect(result.current.displayChordPronunciation).toBe("Seventh");
    });
  });
});
