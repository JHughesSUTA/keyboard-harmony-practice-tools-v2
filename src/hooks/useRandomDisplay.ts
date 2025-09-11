import { useEffect, useState } from "react";
import type { Option } from "../types";
import { usePlayControls } from "../context/PlayControlsContext";

const getRandomOption = (options: Option[]) => {
  return options[Math.floor(Math.random() * options.length)];
};

export default function useRandomDisplay(
  activeKeyOptions: Option[],
  activeChordOptions: Option[],
  running: boolean
) {
  // Fallback options for edge cases (though you mentioned arrays will always have options)
  const defaultKeyOption: Option = {
    id: 0,
    label: "C",
    pronunciation: "C",
    active: true,
  };
  const defaultChordOption: Option = {
    id: 0,
    label: "7",
    pronunciation: "Seventh",
    active: true,
  };

  const [randomizedKey, setRandomizedKey] = useState<Option>(
    activeKeyOptions[0] || defaultKeyOption
  );
  const [randomizedChord, setRandomizedChord] = useState<Option>(
    activeChordOptions[0] || defaultChordOption
  );

  const { label: displayKey, pronunciation: displayKeyPronunciation } =
    randomizedKey;
  const { label: displayChord, pronunciation: displayChordPronunciation } =
    randomizedChord;

  const { tempo } = usePlayControls();

  useEffect(() => {
    if (!running) return;

    const intervalId = setInterval(() => {
      if (activeKeyOptions.length > 0) {
        setRandomizedKey(getRandomOption(activeKeyOptions));
      }
      if (activeChordOptions.length > 0) {
        setRandomizedChord(getRandomOption(activeChordOptions));
      }
    }, 60000 / tempo);

    return () => clearInterval(intervalId);
  }, [running, activeKeyOptions, activeChordOptions, tempo]);

  return {
    displayKey,
    displayKeyPronunciation,
    displayChord,
    displayChordPronunciation,
  };
}
