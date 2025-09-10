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
    <section className="my-4">
      <div className="flex border justify-center py-4 rounded-full items-center mx-auto h-[300px] w-[300px]">
        <span className="text-6xl md:text-8xl">
          {`${displayKey}${displayChord}`}
        </span>
      </div>
    </section>
  );
};

export default Display;
