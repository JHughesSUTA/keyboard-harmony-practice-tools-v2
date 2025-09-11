import useRandomDisplay from "../../hooks/useRandomDisplay";
import type { Option } from "../../types";
import { usePlayControls } from "../../context/PlayControlsContext";

type DisplayProps = {
  activeKeyOptions: Option[];
  activeChordOptions: Option[];
};

const Display = ({ activeKeyOptions, activeChordOptions }: DisplayProps) => {
  const { running } = usePlayControls();
  const {
    displayKey,
    displayKeyPronunciation,
    displayChord,
    displayChordPronunciation,
    isLongName,
  } = useRandomDisplay(activeKeyOptions, activeChordOptions, running);

  return (
    <section className="my-4 xl:my-8" aria-label="Chord display">
      <div className="flex justify-center py-4 rounded-lg items-center mx-auto w-[250px] h-[250px] md:w-[300px] md:h-[300px] bg-black border-2 border-cyan-400/50 shadow-lg shadow-cyan-400/20">
        <span
          className={`${
            isLongName ? "text-5xl" : "text-6xl md:text-7xl"
          } font-mono font-bold text-cyan-400`}
          style={{
            textShadow: "0 0 4px #0891B2, 0 0 8px #0891B2",
          }}
          aria-hidden="true"
        >
          {`${displayKey}${displayChord}`}
        </span>
      </div>

      {/* announce key/chord combination for screen readers */}
      <div
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="all"
        className="sr-only"
      >
        {running
          ? `${displayKeyPronunciation} ${displayChordPronunciation}`
          : ""}
      </div>
    </section>
  );
};

export default Display;
