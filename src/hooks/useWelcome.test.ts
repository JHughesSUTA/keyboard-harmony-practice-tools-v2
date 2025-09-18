import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useWelcome from "./useWelcome";

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("useWelcome", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    it("should show welcome when no localStorage value exists", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useWelcome());

      expect(result.current.showWelcome).toBe(true);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("hasSeenWelcome");
    });

    it("should not show welcome when localStorage value exists", () => {
      mockLocalStorage.getItem.mockReturnValue("true");

      const { result } = renderHook(() => useWelcome());

      expect(result.current.showWelcome).toBe(false);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("hasSeenWelcome");
    });
  });

  describe("Welcome close functionality", () => {
    it("should hide welcome and set localStorage when handleWelcomeClose is called", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useWelcome());

      expect(result.current.showWelcome).toBe(true);

      act(() => {
        result.current.handleWelcomeClose();
      });

      expect(result.current.showWelcome).toBe(false);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "hasSeenWelcome",
        "true"
      );
    });
  });

  describe("Show welcome again functionality", () => {
    it("should show welcome again when showWelcomeAgain is called", () => {
      mockLocalStorage.getItem.mockReturnValue("true");

      const { result } = renderHook(() => useWelcome());

      expect(result.current.showWelcome).toBe(false);

      act(() => {
        result.current.showWelcomeAgain();
      });

      expect(result.current.showWelcome).toBe(true);
    });
  });
});
