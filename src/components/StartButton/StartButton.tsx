import { usePlayControls } from "../../context/PlayControlsContext";
import { FaPlay, FaStop } from "react-icons/fa";

const StartButton = () => {
  const { running, setRunning } = usePlayControls();

  const handlePlayButtonClick = () => {
    setRunning((prev) => !prev);
  };

  return (
    <button onClick={handlePlayButtonClick} className="cursor-pointer">
      {running ? <FaStop size={30} /> : <FaPlay size={30} />}
    </button>
  );
};

export default StartButton;
