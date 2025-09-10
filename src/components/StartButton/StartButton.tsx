import { usePlayControls } from "../../context/PlayControlsContext";
import { FaPlay, FaPause } from "react-icons/fa";

const StartButton = () => {
  const { running, setRunning } = usePlayControls();

  const handlePlayButtonClick = () => {
    setRunning((prev) => !prev);
  };

  return (
    <button
      onClick={handlePlayButtonClick}
      className={`cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-600 ${
        running
          ? "bg-red-500 border-red-400 text-black shadow-md shadow-red-400/30 hover:bg-red-400 focus:ring-red-400"
          : "bg-green-500 border-green-400 text-black shadow-md shadow-green-400/30 hover:bg-green-400 focus:ring-green-400"
      }`}
      aria-label={running ? "Pause randomizer" : "Start randomizer"}
      aria-pressed={running}
      type="button"
    >
      {running ? <FaPause size={30} /> : <FaPlay size={30} />}
      <span className="sr-only">
        {running ? "Pause randomizer" : "Start randomizer"}
      </span>
    </button>
  );
};

export default StartButton;
