import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OptionsButtonGrid from "./OptionsButtonGrid";
import { initialKeyOptions } from "../../data/keyOptionData";
import { initialChordOptions } from "../../data/chordOptionData";

describe("OptionsButtonGrid", () => {
  const mockToggleActive = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Rendering", () => {
    it("should render all provided options as buttons", () => {
      const testOptions = [
        { id: 1, label: "Test 1", pronunciation: "Test 1", active: true },
        { id: 2, label: "Test 2", pronunciation: "Test 2", active: false },
        { id: 3, label: "Test 3", pronunciation: "Test 3", active: true },
      ];

      render(
        <OptionsButtonGrid
          options={testOptions}
          toggleActive={mockToggleActive}
        />
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);
      expect(screen.getByText("Test 1")).toBeInTheDocument();
      expect(screen.getByText("Test 2")).toBeInTheDocument();
      expect(screen.getByText("Test 3")).toBeInTheDocument();
    });

    it("should render empty grid when no options provided", () => {
      render(
        <OptionsButtonGrid options={[]} toggleActive={mockToggleActive} />
      );

      const buttons = screen.queryAllByRole("button");
      expect(buttons).toHaveLength(0);
    });

    it("should have proper grid layout structure", () => {
      const testOptions = [
        { id: 1, label: "Test", pronunciation: "Test", active: true },
      ];

      const { container } = render(
        <OptionsButtonGrid
          options={testOptions}
          toggleActive={mockToggleActive}
        />
      );

      const section = container.querySelector("section");
      const gridDiv = container.querySelector("div");

      expect(section).toBeInTheDocument();
      expect(gridDiv).toHaveClass("grid", "gap-2", "grid-cols-6");
    });
  });

  describe("Key Options Integration", () => {
    it("should render all key options from initial data", () => {
      render(
        <OptionsButtonGrid
          options={initialKeyOptions}
          toggleActive={mockToggleActive}
        />
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(initialKeyOptions.length);
    });

    it("should render key labels correctly", () => {
      render(
        <OptionsButtonGrid
          options={initialKeyOptions}
          toggleActive={mockToggleActive}
        />
      );

      // Test a few key labels to ensure data is being passed correctly
      expect(screen.getByText("C")).toBeInTheDocument();
      expect(screen.getByText("G")).toBeInTheDocument();
      expect(screen.getByText("F♯")).toBeInTheDocument(); // Testing unicode character
    });
  });

  describe("Chord Options Integration", () => {
    it("should render all chord options from initial data", () => {
      render(
        <OptionsButtonGrid
          options={initialChordOptions}
          toggleActive={mockToggleActive}
        />
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(initialChordOptions.length);
    });

    it("should render chord labels correctly", () => {
      render(
        <OptionsButtonGrid
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

  describe("Interaction", () => {
    it("should pass toggleActive function to child buttons", async () => {
      const user = userEvent.setup();
      const testOptions = [
        {
          id: 1,
          label: "Test Button",
          pronunciation: "Test Button",
          active: false,
        },
      ];

      render(
        <OptionsButtonGrid
          options={testOptions}
          toggleActive={mockToggleActive}
        />
      );

      const button = screen.getByText("Test Button");
      await user.click(button);

      expect(mockToggleActive).toHaveBeenCalledTimes(1);
      expect(mockToggleActive).toHaveBeenCalledWith(1);
    });

    it("should handle multiple button interactions", async () => {
      const user = userEvent.setup();
      const testOptions = [
        { id: 1, label: "Button 1", pronunciation: "Button 1", active: false },
        { id: 2, label: "Button 2", pronunciation: "Button 2", active: true },
      ];

      render(
        <OptionsButtonGrid
          options={testOptions}
          toggleActive={mockToggleActive}
        />
      );

      await user.click(screen.getByText("Button 1"));
      await user.click(screen.getByText("Button 2"));

      expect(mockToggleActive).toHaveBeenCalledTimes(2);
      expect(mockToggleActive).toHaveBeenNthCalledWith(1, 1);
      expect(mockToggleActive).toHaveBeenNthCalledWith(2, 2);
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic structure", () => {
      const testOptions = [
        { id: 1, label: "Test", pronunciation: "Test", active: true },
      ];

      const { container } = render(
        <OptionsButtonGrid
          options={testOptions}
          toggleActive={mockToggleActive}
        />
      );

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("should maintain button accessibility through OptionButton component", () => {
      const testOptions = [
        {
          id: 1,
          label: "Active Option",
          pronunciation: "Active Option",
          active: true,
        },
        {
          id: 2,
          label: "Inactive Option",
          pronunciation: "Inactive Option",
          active: false,
        },
      ];

      render(
        <OptionsButtonGrid
          options={testOptions}
          toggleActive={mockToggleActive}
        />
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);

      // Verify buttons are accessible and have proper labels
      expect(screen.getByText("Active Option")).toBeInTheDocument();
      expect(screen.getByText("Inactive Option")).toBeInTheDocument();

      // Verify buttons are focusable
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
        button.focus();
        expect(button).toHaveFocus();
      });
    });
  });
});
