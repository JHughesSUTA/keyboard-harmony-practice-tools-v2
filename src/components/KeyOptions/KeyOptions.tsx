import OptionButton from "../OptionButton/OptionButton";
import { initialKeyOptions } from "../../data/keyOptionData";
import useOptions from "../../hooks/useOptions";

const KeyOptions = () => {
  const { options: keyOptions, toggleActive } = useOptions(
    initialKeyOptions,
    "key"
  );

  return (
    <section>
      <div className="grid gap-2 md:gap-4 grid-cols-6 py-4 text-xs md:text-lg">
        {keyOptions.map((key) => (
          <OptionButton key={key.id} option={key} toggleActive={toggleActive} />
        ))}
      </div>
    </section>
  );
};

export default KeyOptions;
