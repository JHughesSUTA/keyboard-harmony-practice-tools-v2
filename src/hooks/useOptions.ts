import { useState, useEffect } from "react";
import type { Option } from "../types";

export default function useOptions(
  initialOptions: Option[],
  optionType: string
) {
  const [options, setOptions] = useState<Option[]>(() => {
    const stored = sessionStorage.getItem(`${optionType}-options`);

    if (stored) {
      return JSON.parse(stored);
    } else {
      return initialOptions;
    }
  });

  const activeOptions = options.filter((option) => option.active);

  useEffect(() => {
    sessionStorage.setItem(`${optionType}-options`, JSON.stringify(options));
  }, [options]);

  const toggleActive = (id: number) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, active: !option.active } : option
      )
    );
  };

  return { options, toggleActive, activeOptions };
}
