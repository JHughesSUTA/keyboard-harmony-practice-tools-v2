import OptionButton from "../OptionButton/OptionButton";
import type { Option } from "../../types";

type OptionsButtonGridProps = {
  options: Option[];
  toggleActive: (id: number) => void;
};

const OptionsButtonGrid = ({
  options,
  toggleActive,
}: OptionsButtonGridProps) => {
  return (
    <section>
      <div className="grid gap-2 p-2 md:gap-3 grid-cols-6 md:p-3 text-xs md:text-lg">
        {options.map((option: Option) => (
          <OptionButton
            key={option.id}
            option={option}
            toggleActive={toggleActive}
          />
        ))}
      </div>
    </section>
  );
};

export default OptionsButtonGrid;
