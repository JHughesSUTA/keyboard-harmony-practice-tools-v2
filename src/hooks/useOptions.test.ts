import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useOptions from "./useOptions";
import type { Option } from "../types";

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Replace the global sessionStorage with our mock
Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

describe("useOptions", () => {
  // Test data
  const mockInitialOptions: Option[] = [
    { id: 1, label: "Option 1", active: true },
    { id: 2, label: "Option 2", active: false },
    { id: 3, label: "Option 3", active: true },
  ];

  const mockOptionType = "test";

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset sessionStorage mock to return null by default
    sessionStorageMock.getItem.mockReturnValue(null);
  });

  describe("Initialization", () => {
    it("should return initial options when no stored data exists", () => {
      const { result } = renderHook(() =>
        useOptions(mockInitialOptions, mockOptionType)
      );

      expect(result.current.options).toEqual(mockInitialOptions);
      expect(sessionStorageMock.getItem).toHaveBeenCalledWith("test-options");
    });

    it("should load stored options from sessionStorage when available", () => {
      const storedOptions: Option[] = [
        { id: 1, label: "Option 1", active: false }, // Different from initial
        { id: 2, label: "Option 2", active: true }, // Different from initial
        { id: 3, label: "Option 3", active: false }, // Different from initial
      ];

      sessionStorageMock.getItem.mockReturnValue(JSON.stringify(storedOptions));

      const { result } = renderHook(() =>
        useOptions(mockInitialOptions, mockOptionType)
      );

      expect(result.current.options).toEqual(storedOptions);
      expect(sessionStorageMock.getItem).toHaveBeenCalledWith("test-options");
    });

    it("should use different storage keys for different option types", () => {
      renderHook(() => useOptions(mockInitialOptions, "key"));
      renderHook(() => useOptions(mockInitialOptions, "chord"));

      expect(sessionStorageMock.getItem).toHaveBeenCalledWith("key-options");
      expect(sessionStorageMock.getItem).toHaveBeenCalledWith("chord-options");
    });
  });

  describe("toggleActive functionality", () => {
    it("should toggle active state of the correct option", () => {
      const { result } = renderHook(() =>
        useOptions(mockInitialOptions, mockOptionType)
      );

      act(() => {
        result.current.toggleActive(2); // Toggle option with id: 2
      });

      const updatedOptions = result.current.options;
      expect(updatedOptions[0]).toEqual({
        id: 1,
        label: "Option 1",
        active: true,
      }); // Unchanged
      expect(updatedOptions[1]).toEqual({
        id: 2,
        label: "Option 2",
        active: true,
      }); // Changed from false to true
      expect(updatedOptions[2]).toEqual({
        id: 3,
        label: "Option 3",
        active: true,
      }); // Unchanged
    });
  });

  describe("sessionStorage integration", () => {
    it("should save to sessionStorage when options change", () => {
      const { result } = renderHook(() =>
        useOptions(mockInitialOptions, mockOptionType)
      );

      act(() => {
        result.current.toggleActive(1);
      });

      // Should have been called twice: once on mount, once after toggle
      expect(sessionStorageMock.setItem).toHaveBeenCalledTimes(2);

      // Check the most recent call
      const lastCall = sessionStorageMock.setItem.mock.calls[1];
      expect(lastCall[0]).toBe("test-options");

      const savedData = JSON.parse(lastCall[1]);
      expect(savedData[0].active).toBe(false); // Should be toggled from true to false
    });
  });

  describe("Edge cases", () => {
    it("should handle empty initial options array", () => {
      const { result } = renderHook(() => useOptions([], mockOptionType));

      expect(result.current.options).toEqual([]);

      // Toggling on empty array should not crash
      act(() => {
        result.current.toggleActive(1);
      });

      expect(result.current.options).toEqual([]);
    });
  });
});
