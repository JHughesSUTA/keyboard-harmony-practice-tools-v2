import { useState } from "react";
import type { ChordOption } from "../../types";

const ChordOptions = () => {
  const [chordOptions, setChordOptions] = useState<ChordOption[]>([
    {
      id: 1,
      label: "M7",
      active: true,
    },
    {
      id: 2,
      label: "7",
      active: true,
    },
    {
      id: 3,
      label: "m7",
      active: false,
    },
    {
      id: 4,
      label: "m7(\u266d5)",
      active: false,
    },
    {
      id: 5,
      label: "\u00B07",
      active: false,
    },
    {
      id: 6,
      label: "7alt",
      active: false,
    },
  ]);

  return (
    <section>
      <div className="grid gap-2 md:gap-4 grid-cols-6 py-4 text-xs md:text-lg">
        {chordOptions.map((chord) => (
          <button className="border cursor-pointer rounded py-3">
            {chord.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ChordOptions;
