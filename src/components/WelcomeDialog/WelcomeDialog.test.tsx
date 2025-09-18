import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WelcomeDialog from "./WelcomeDialog";

// Mock the useDialog hook
const mockOpenDialog = vi.fn();
const mockCloseDialog = vi.fn();
const mockDialogRef = { current: null };

vi.mock("../../hooks/useDialog", () => ({
  default: vi.fn(() => ({
    isOpen: false,
    dialogRef: mockDialogRef,
    openDialog: mockOpenDialog,
    closeDialog: mockCloseDialog,
  })),
}));

import useDialog from "../../hooks/useDialog";
const mockUseDialog = vi.mocked(useDialog);

describe("WelcomeDialog", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  describe("Rendering", () => {
    it("should render dialog with welcome content", () => {
      render(<WelcomeDialog shouldShow={true} onClose={mockOnClose} />);

      expect(
        screen.getByText("🎹 Welcome to the Keyboard Harmony Practice Tool!")
      ).toBeInTheDocument();
      expect(screen.getByText("🎯 How to use:")).toBeInTheDocument();
      expect(screen.getByText("♿ Accessibility:")).toBeInTheDocument();
      expect(screen.getByText("Let's Practice! 🎵")).toBeInTheDocument();
    });

    it("should render dialog with proper instructions", () => {
      render(<WelcomeDialog shouldShow={true} onClose={mockOnClose} />);

      expect(
        screen.getByText(/Select the keys and chords you want to practice/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Adjust the tempo with the slider/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Press the play button to start/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Screen readers will announce chord changes/)
      ).toBeInTheDocument();
    });
  });

  describe("Dialog opening behavior", () => {
    it("should open dialog when shouldShow is true and dialog is not open", () => {
      mockUseDialog.mockReturnValue({
        isOpen: false,
        dialogRef: mockDialogRef,
        openDialog: mockOpenDialog,
        closeDialog: mockCloseDialog,
      });

      render(<WelcomeDialog shouldShow={true} onClose={mockOnClose} />);

      expect(mockOpenDialog).toHaveBeenCalled();
    });

    it("should not open dialog when shouldShow is false", () => {
      render(<WelcomeDialog shouldShow={false} onClose={mockOnClose} />);

      expect(mockOpenDialog).not.toHaveBeenCalled();
    });

    it("should not open dialog when shouldShow is true but dialog is already open", () => {
      mockUseDialog.mockReturnValue({
        isOpen: true,
        dialogRef: mockDialogRef,
        openDialog: mockOpenDialog,
        closeDialog: mockCloseDialog,
      });

      render(<WelcomeDialog shouldShow={true} onClose={mockOnClose} />);

      expect(mockOpenDialog).not.toHaveBeenCalled();
    });
  });

  describe("Dialog closing behavior", () => {
    it("should call closeDialog and onClose when button is clicked", async () => {
      const user = userEvent.setup();

      render(<WelcomeDialog shouldShow={true} onClose={mockOnClose} />);

      const closeButton = screen.getByText("Let's Practice! 🎵");
      await user.click(closeButton);

      expect(mockCloseDialog).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper dialog element", () => {
      render(<WelcomeDialog shouldShow={true} onClose={mockOnClose} />);

      const dialog = screen.getByRole("dialog", { hidden: true });
      expect(dialog).toBeInTheDocument();
    });
  });
});
