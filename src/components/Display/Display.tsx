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
    <section>
      <div className="flex border justify-center py-4">
        <span className="text-6xl md:text-8xl">
          {`${displayKey}${displayChord}`}
        </span>
      </div>
    </section>
  );
};

export default Display;
