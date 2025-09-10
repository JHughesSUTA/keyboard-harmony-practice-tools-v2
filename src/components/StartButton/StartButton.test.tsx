import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StartButton from "./StartButton";

// Mock the PlayControlsContext
const mockSetRunning = vi.fn();

vi.mock("../../context/PlayControlsContext", () => ({
  usePlayControls: vi.fn(() => ({
    tempo: 60,
    setTempo: vi.fn(),
    running: false, // Default to not running
    setRunning: mockSetRunning,
  })),
}));

// Import the mocked hook for manipulation in tests
import { usePlayControls } from "../../context/PlayControlsContext";
const mockUsePlayControls = vi.mocked(usePlayControls);

describe("StartButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to default state before each test
    mockUsePlayControls.mockReturnValue({
      tempo: 60,
      setTempo: vi.fn(),
      running: false,
      setRunning: mockSetRunning,
    });
  });

  afterEach(() => {
    cleanup();
  });

  describe("Display", () => {
    it("should show play icon when not running", () => {
      render(<StartButton />);

      // The FaPlay icon should be present
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();

      // Check that it contains the play icon (FaPlay renders as SVG)
      const playIcon = button.querySelector("svg");
      expect(playIcon).toBeInTheDocument();
    });

    it("should show stop icon when running", () => {
      // Set running to true
      mockUsePlayControls.mockReturnValue({
        tempo: 60,
        setTempo: vi.fn(),
        running: true,
        setRunning: mockSetRunning,
      });

      render(<StartButton />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();

      // Check that it contains the stop icon (FaStop renders as SVG)
      const stopIcon = button.querySelector("svg");
      expect(stopIcon).toBeInTheDocument();
    });
  });

  describe("Interaction", () => {
    it("should call setRunning with toggle function when clicked", async () => {
      const user = userEvent.setup();

      render(<StartButton />);

      const button = screen.getByRole("button");
      await user.click(button);

      // Should call setRunning with a function
      expect(mockSetRunning).toHaveBeenCalledTimes(1);
      expect(mockSetRunning).toHaveBeenCalledWith(expect.any(Function));
    });

    it("should toggle running state from false to true", async () => {
      const user = userEvent.setup();
      let capturedCallback: ((prev: boolean) => boolean) | undefined;

      // Capture the callback function passed to setRunning
      mockSetRunning.mockImplementation((callback) => {
        if (typeof callback === "function") {
          capturedCallback = callback;
        }
      });

      render(<StartButton />);

      const button = screen.getByRole("button");
      await user.click(button);

      // Verify the callback toggles false to true
      expect(capturedCallback).toBeDefined();
      if (capturedCallback) {
        expect(capturedCallback(false)).toBe(true);
      }
    });

    it("should toggle running state from true to false", async () => {
      const user = userEvent.setup();
      let capturedCallback: ((prev: boolean) => boolean) | undefined;

      // Set initial state to running
      mockUsePlayControls.mockReturnValue({
        tempo: 60,
        setTempo: vi.fn(),
        running: true,
        setRunning: mockSetRunning,
      });

      // Capture the callback function passed to setRunning
      mockSetRunning.mockImplementation((callback) => {
        if (typeof callback === "function") {
          capturedCallback = callback;
        }
      });

      render(<StartButton />);

      const button = screen.getByRole("button");
      await user.click(button);

      // Verify the callback toggles true to false
      expect(capturedCallback).toBeDefined();
      if (capturedCallback) {
        expect(capturedCallback(true)).toBe(false);
      }
    });
  });

  describe("Accessibility", () => {
    it("should have cursor-pointer class for better UX", () => {
      render(<StartButton />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("cursor-pointer");
    });

    it("should be focusable", () => {
      render(<StartButton />);

      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });
  });
});
