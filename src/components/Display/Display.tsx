import useRandomDisplay from "../../hooks/useRandomDisplay";
import type { Option } from "../../types";
import { usePlayControls } from "../../context/PlayControlsContext";

type DisplayProps = {
  activeKeyOptions: Option[];
  activeChordOptions: Option[];
};

const Display = ({ activeKeyOptions, activeChordOptions }: DisplayProps) => {
  const { running } = usePlayControls();
  const { displayKey, displayChord } = useRandomDisplay(
    activeKeyOptions,
    activeChordOptions,
    running
  );

  return (
    <section className="my-4 xl:my-8">
      <div className="flex justify-center py-4 rounded-lg items-center mx-auto w-[250px] h-[250px] md:w-[300px] md:h-[300px] bg-black border-2 border-cyan-400/50 shadow-lg shadow-cyan-400/20">
        <span
          className="text-6xl md:text-8xl font-mono font-bold text-cyan-400"
          style={{
            textShadow: "0 0 4px #0891B2, 0 0 8px #0891B2",
          }}
        >
          {`${displayKey}${displayChord}`}
        </span>
      </div>
    </section>
  );
};

export default Display;
