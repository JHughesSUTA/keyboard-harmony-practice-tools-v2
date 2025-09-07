import OptionButton from "../OptionButton/OptionButton";
import useOptions from "../../hooks/useOptions";
import { initialChordOptions } from "../../data/chordOptionData";

const ChordOptions = () => {
  const { options: chordOptions, toggleActive } = useOptions(
    initialChordOptions,
    "chord"
  );

  return (
    <section>
      <div className="grid gap-2 md:gap-4 grid-cols-6 py-4 text-xs md:text-lg">
        {chordOptions.map((chord) => (
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
