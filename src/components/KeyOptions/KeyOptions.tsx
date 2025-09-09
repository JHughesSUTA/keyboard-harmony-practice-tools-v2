import OptionButton from "../OptionButton/OptionButton";
import type { Option } from "../../types";

type KeyOptionsProps = {
  options: Option[];
  toggleActive: (id: number) => void;
};

const KeyOptions = ({ options, toggleActive }: KeyOptionsProps) => {
  return (
    <section>
      <div className="grid gap-2 md:gap-4 grid-cols-6 py-4 text-xs md:text-lg">
        {options.map((key: Option) => (
          <OptionButton key={key.id} option={key} toggleActive={toggleActive} />
        ))}
      </div>
    </section>
  );
};

export default KeyOptions;
