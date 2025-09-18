import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useDialog from "./useDialog";

// Mock HTMLDialogElement methods
const mockShowModal = vi.fn();
const mockClose = vi.fn();
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

// Mock dialog element
const mockDialogElement = {
  showModal: mockShowModal,
  close: mockClose,
  addEventListener: mockAddEventListener,
  removeEventListener: mockRemoveEventListener,
} as unknown as HTMLDialogElement;

describe("useDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    it("should initialize with closed state by default", () => {
      const { result } = renderHook(() => useDialog());

      expect(result.current.isOpen).toBe(false);
      expect(result.current.dialogRef.current).toBe(null);
    });

    it("should initialize with open state when initialOpen is true", () => {
      const { result } = renderHook(() => useDialog(true));

      expect(result.current.isOpen).toBe(true);
    });
  });

  describe("Dialog operations", () => {
    it("should open dialog when openDialog is called", () => {
      const { result } = renderHook(() => useDialog());

      // Mock the ref to have a dialog element
      act(() => {
        result.current.dialogRef.current = mockDialogElement;
      });

      act(() => {
        result.current.openDialog();
      });

      expect(result.current.isOpen).toBe(true);
      expect(mockShowModal).toHaveBeenCalled();
    });

    it("should close dialog when closeDialog is called", () => {
      const { result } = renderHook(() => useDialog(true));

      // Mock the ref to have a dialog element
      act(() => {
        result.current.dialogRef.current = mockDialogElement;
      });

      act(() => {
        result.current.closeDialog();
      });

      expect(result.current.isOpen).toBe(false);
      expect(mockClose).toHaveBeenCalled();
    });

    it("should handle openDialog when no dialog ref exists", () => {
      const { result } = renderHook(() => useDialog());

      act(() => {
        result.current.openDialog();
      });

      expect(result.current.isOpen).toBe(true);
      expect(mockShowModal).not.toHaveBeenCalled();
    });
  });

  describe("Event listeners", () => {
    it("should add event listeners when dialog ref is set", () => {
      renderHook(() => {
        const hook = useDialog();
        // Set the ref immediately after creating the hook
        if (hook.dialogRef.current === null) {
          hook.dialogRef.current = mockDialogElement;
        }
        return hook;
      });

      expect(mockAddEventListener).toHaveBeenCalledWith(
        "close",
        expect.any(Function)
      );
      expect(mockAddEventListener).toHaveBeenCalledWith(
        "click",
        expect.any(Function)
      );
    });

    it("should remove event listeners on cleanup", () => {
      const { unmount } = renderHook(() => {
        const hook = useDialog();
        // Set the ref immediately after creating the hook
        if (hook.dialogRef.current === null) {
          hook.dialogRef.current = mockDialogElement;
        }
        return hook;
      });

      unmount();

      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        "close",
        expect.any(Function)
      );
      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        "click",
        expect.any(Function)
      );
    });
  });
});
