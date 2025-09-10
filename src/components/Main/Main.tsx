import KeyOptions from "../KeyOptions/KeyOptions";
import ChordOptions from "../ChordOptions/ChordOptions";
import Display from "../Display/Display";
import Controls from "../Controls/Controls";
import useOptions from "../../hooks/useOptions";
import { initialChordOptions } from "../../data/chordOptionData";
import { initialKeyOptions } from "../../data/keyOptionData";

const Main = () => {
  const {
    options: keyOptions,
    toggleActive: toggleKeyActive,
    activeOptions: activeKeyOptions,
  } = useOptions(initialKeyOptions, "key");

  const {
    options: chordOptions,
    toggleActive: toggleChordActive,
    activeOptions: activeChordOptions,
  } = useOptions(initialChordOptions, "chord");

  return (
    <main className="block w-sm md:w-2xl xl:w-6xl mx-auto bg-gray-300 px-6 py-4 rounded">
      <Controls />
      <KeyOptions options={keyOptions} toggleActive={toggleKeyActive} />
      <Display
        activeKeyOptions={activeKeyOptions}
        activeChordOptions={activeChordOptions}
      />
      <ChordOptions options={chordOptions} toggleActive={toggleChordActive} />
    </main>
  );
};

export default Main;
