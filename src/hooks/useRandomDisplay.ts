import { useEffect, useState } from "react";
import type { Option } from "../types";

const getRandomOption = (options: Option[]) => {
  const values = options.map((option) => option.label);
  return values[Math.floor(Math.random() * values.length)];
};

export default function useRandomDisplay(
  activeKeyOptions: Option[],
  activeChordOptions: Option[],
  running: boolean,
  interval: number
) {
  const [displayKey, setDisplayKey] = useState<string>("C");
  const [displayChord, setDisplayChord] = useState<string>("7");

  useEffect(() => {
    if (!running) return;

    const intervalId = setInterval(() => {
      if (activeKeyOptions.length > 0) {
        setDisplayKey(getRandomOption(activeKeyOptions));
      }
      if (activeChordOptions.length > 0) {
        setDisplayChord(getRandomOption(activeChordOptions));
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [running, activeKeyOptions, activeChordOptions, interval]);

  return { displayKey, displayChord };
}
