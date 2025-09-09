import useRandomDisplay from "../../hooks/useRandomDisplay";
import type { Option } from "../../types";

type DisplayProps = {
  activeKeyOptions: Option[];
  activeChordOptions: Option[];
  running: boolean;
};

const Display = ({
  activeKeyOptions,
  activeChordOptions,
  running,
}: DisplayProps) => {
  const { displayKey, displayChord } = useRandomDisplay(
    activeKeyOptions,
    activeChordOptions,
    running,
    2000
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
