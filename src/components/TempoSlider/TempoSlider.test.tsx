import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import TempoSlider from "./TempoSlider";

// Mock the PlayControlsContext
const mockSetTempo = vi.fn();

vi.mock("../../context/PlayControlsContext", () => ({
  usePlayControls: vi.fn(() => ({
    tempo: 60,
    setTempo: mockSetTempo,
    running: false,
    setRunning: vi.fn(),
  })),
}));

// Import the mocked hook for manipulation in tests
import { usePlayControls } from "../../context/PlayControlsContext";
const mockUsePlayControls = vi.mocked(usePlayControls);

describe("TempoSlider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to default state before each test
    mockUsePlayControls.mockReturnValue({
      tempo: 60,
      setTempo: mockSetTempo,
      running: false,
      setRunning: vi.fn(),
    });
  });

  afterEach(() => {
    cleanup();
  });

  describe("Rendering", () => {
    it("should render range input with correct attributes", () => {
      render(<TempoSlider />);

      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
      expect(slider).toHaveAttribute("min", "20");
      expect(slider).toHaveAttribute("max", "60");
      expect(slider).toHaveAttribute("step", "2");
      expect(slider).toHaveAttribute("type", "range");
      expect(slider).toHaveAttribute("name", "tempo");
    });

    it("should display current tempo value", () => {
      render(<TempoSlider />);

      expect(screen.getByText("60bpm")).toBeInTheDocument();
    });

    it("should reflect different tempo values from context", () => {
      mockUsePlayControls.mockReturnValue({
        tempo: 40,
        setTempo: mockSetTempo,
        running: false,
        setRunning: vi.fn(),
      });

      render(<TempoSlider />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveValue("40");
      expect(screen.getByText("40bpm")).toBeInTheDocument();
    });
  });

  describe("Interaction", () => {
    it("should call setTempo when slider value changes", () => {
      render(<TempoSlider />);

      const slider = screen.getByRole("slider");

      // Simulate changing the slider to a new value
      fireEvent.change(slider, { target: { value: "50" } });

      expect(mockSetTempo).toHaveBeenCalledWith(50);
    });

    it("should handle multiple tempo changes", () => {
      render(<TempoSlider />);

      const slider = screen.getByRole("slider");

      // Simulate changing the slider to different values
      fireEvent.change(slider, { target: { value: "30" } });
      fireEvent.change(slider, { target: { value: "50" } });

      expect(mockSetTempo).toHaveBeenCalledWith(30);
      expect(mockSetTempo).toHaveBeenCalledWith(50);
      expect(mockSetTempo).toHaveBeenCalledTimes(2);
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<TempoSlider />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute(
        "aria-label",
        "Tempo control in beats per minute"
      );
      expect(slider).toHaveAttribute("aria-describedby", "tempo-display");
      expect(slider).toHaveAttribute("aria-valuemin", "20");
      expect(slider).toHaveAttribute("aria-valuemax", "60");
      expect(slider).toHaveAttribute("aria-valuenow", "60");
      expect(slider).toHaveAttribute("aria-valuetext", "60 beats per minute");
    });

    it("should have proper label association", () => {
      render(<TempoSlider />);

      const slider = screen.getByRole("slider");
      const label = screen.getByLabelText("Tempo (beats per minute)");

      expect(label).toBe(slider);
      expect(slider).toHaveAttribute("id", "tempo-slider");
    });

    it("should have live region for tempo display", () => {
      render(<TempoSlider />);

      const display = screen.getByText("60bpm");
      expect(display).toHaveAttribute("aria-live", "polite");
      expect(display).toHaveAttribute("id", "tempo-display");
    });

    it("should update ARIA attributes when tempo changes", () => {
      mockUsePlayControls.mockReturnValue({
        tempo: 40,
        setTempo: mockSetTempo,
        running: false,
        setRunning: vi.fn(),
      });

      render(<TempoSlider />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "40");
      expect(slider).toHaveAttribute("aria-valuetext", "40 beats per minute");
    });

    it("should have keyboard navigation support", () => {
      render(<TempoSlider />);

      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("autoComplete", "off");
      expect(slider).toHaveAttribute("step", "2");
    });
  });
});
