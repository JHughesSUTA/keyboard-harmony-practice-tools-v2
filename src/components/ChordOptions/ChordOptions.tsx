import OptionButton from "../OptionButton/OptionButton";
import type { Option } from "../../types";

type ChordOptionsProps = {
  options: Option[];
  toggleActive: (id: number) => void;
};

const ChordOptions = ({ options, toggleActive }: ChordOptionsProps) => {
  return (
    <section>
      <div className="grid gap-2 md:gap-4 grid-cols-6 py-4 text-xs md:text-lg">
        {options.map((chord: Option) => (
          <OptionButton
            key={chord.id}
            option={chord}
            toggleActive={toggleActive}
          />
        ))}
      </div>
    </section>
  );
};

export default ChordOptions;
