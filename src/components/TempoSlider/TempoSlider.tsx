import { usePlayControls } from "../../context/PlayControlsContext";
import type { ChangeEvent } from "react";

const TempoSlider = () => {
  const { tempo, setTempo } = usePlayControls();

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempo(Number(e.target.value));
  };

  return (
    <div>
      <input
        name="tempo"
        className="tempo-container__slider"
        type="range"
        autoComplete="off"
        min="20"
        max="80"
        value={tempo}
        onChange={handleRangeChange}
        step="2"
      />
      <span>{`${tempo}bpm`}</span>
    </div>
  );
};

export default TempoSlider;
