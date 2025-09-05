import { useState } from "react";
import type { KeyOption } from "../../types";

const KeyOptions = () => {
  const [keyOptions, setKeyOptions] = useState<KeyOption[]>([
    {
      id: 1,
      label: "C",
      active: true,
    },
    {
      id: 2,
      label: "G",
      active: true,
    },
    {
      id: 3,
      label: "D",
      active: false,
    },
    {
      id: 4,
      label: "A",
      active: false,
    },
    {
      id: 5,
      label: "E",
      active: false,
    },
    {
      id: 6,
      label: "B",
      active: false,
    },
    {
      id: 7,
      label: "F\u266F",
      active: false,
    },
    {
      id: 8,
      label: "C\u266F",
      active: false,
    },
    {
      id: 9,
      label: "B\u266d",
      active: false,
    },
    {
      id: 10,
      label: "E\u266d",
      active: false,
    },
    {
      id: 11,
      label: "A\u266d",
      active: false,
    },
    {
      id: 12,
      label: "D\u266d",
      active: false,
    },
  ]);

  return (
    <section>
      <div className="grid gap-2 md:gap-4 grid-cols-6 py-4 text-xs md:text-lg">
        {keyOptions.map((key) => (
          <button className="border cursor-pointer rounded py-3">
            {key.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default KeyOptions;
