import Display from "../Display/Display";
import Controls from "../Controls/Controls";
import useOptions from "../../hooks/useOptions";
import { initialChordOptions } from "../../data/chordOptionData";
import { initialKeyOptions } from "../../data/keyOptionData";
import OptionsButtonGrid from "../OptionsButtonGrid/OptionsButtonGrid";

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
    <main className="block w-sm md:w-2xl xl:w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 p-4 xl:p-8 rounded-lg shadow-2xl">
      <Controls />
      <OptionsButtonGrid options={keyOptions} toggleActive={toggleKeyActive} />
      <Display
        activeKeyOptions={activeKeyOptions}
        activeChordOptions={activeChordOptions}
      />
      <OptionsButtonGrid
        options={chordOptions}
        toggleActive={toggleChordActive}
      />
    </main>
  );
};

export default Main;
