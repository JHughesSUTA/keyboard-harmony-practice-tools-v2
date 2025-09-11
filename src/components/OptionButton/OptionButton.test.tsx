import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OptionButton from "./OptionButton";
import type { Option } from "../../types";

describe("OptionButton", () => {
  // Mock data for testing
  const mockActiveOption: Option = {
    id: 1,
    label: "C Major",
    pronunciation: "C Major",
    active: true,
  };

  const mockInactiveOption: Option = {
    id: 2,
    label: "D Minor",
    pronunciation: "D Minor",
    active: false,
  };

  // Mock function to track if it gets called
  const mockToggleActive = vi.fn();

  // Clear mocks before each test
  beforeEach(() => {
    mockToggleActive.mockClear();
  });

  // Clean up DOM after each test
  afterEach(() => {
    cleanup();
  });

  describe("Rendering", () => {
    it("should render the option label correctly", () => {
      render(
        <OptionButton
          option={mockActiveOption}
          toggleActive={mockToggleActive}
        />
      );

      expect(screen.getByText("C Major")).toBeInTheDocument();
    });

    it("should render button with correct role", () => {
      render(
        <OptionButton
          option={mockActiveOption}
          toggleActive={mockToggleActive}
        />
      );

      expect(screen.getByText("C Major")).toBeInTheDocument();
    });
  });

  describe("Styling based on active state", () => {
    it("should have cyan background when option is active", () => {
      render(
        <OptionButton
          option={mockActiveOption}
          toggleActive={mockToggleActive}
        />
      );

      const button = screen.getByText("C Major");
      expect(button).toHaveClass("bg-cyan-500");
      expect(button).not.toHaveClass("bg-slate-700");
    });

    it("should have slate background when option is inactive", () => {
      render(
        <OptionButton
          option={mockInactiveOption}
          toggleActive={mockToggleActive}
        />
      );

      const button = screen.getByText("D Minor");
      expect(button).toHaveClass("bg-slate-700");
      expect(button).not.toHaveClass("bg-cyan-500");
    });

    it("should always have base classes", () => {
      render(
        <OptionButton
          option={mockActiveOption}
          toggleActive={mockToggleActive}
        />
      );

      const button = screen.getByText("C Major");
      expect(button).toHaveClass(
        "border-2",
        "cursor-pointer",
        "rounded-lg",
        "py-3"
      );
    });
  });

  describe("Click behavior", () => {
    it("should call toggleActive with correct ID when clicked", async () => {
      const user = userEvent.setup();

      render(
        <OptionButton
          option={mockActiveOption}
          toggleActive={mockToggleActive}
        />
      );

      const button = screen.getByText("C Major");
      await user.click(button);

      expect(mockToggleActive).toHaveBeenCalledTimes(1);
      expect(mockToggleActive).toHaveBeenCalledWith(1);
    });

    it("should call toggleActive with different ID for different option", async () => {
      const user = userEvent.setup();

      render(
        <OptionButton
          option={mockInactiveOption}
          toggleActive={mockToggleActive}
        />
      );

      const button = screen.getByText("D Minor");
      await user.click(button);

      expect(mockToggleActive).toHaveBeenCalledTimes(1);
      expect(mockToggleActive).toHaveBeenCalledWith(2);
    });

    it("should call toggleActive multiple times when clicked multiple times", async () => {
      const user = userEvent.setup();

      render(
        <OptionButton
          option={mockActiveOption}
          toggleActive={mockToggleActive}
        />
      );

      const button = screen.getByText("C Major");
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockToggleActive).toHaveBeenCalledTimes(3);
      expect(mockToggleActive).toHaveBeenCalledWith(1);
    });
  });
});
