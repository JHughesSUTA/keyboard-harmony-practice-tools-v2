import { usePlayControls } from "../../context/PlayControlsContext";
import type { ChangeEvent } from "react";

const TempoSlider = () => {
  const { tempo, setTempo } = usePlayControls();

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempo(Number(e.target.value));
  };

  return (
    <div className="flex items-center gap-3">
      <input
        name="tempo"
        className="w-32 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
        type="range"
        autoComplete="off"
        min="20"
        max="60"
        value={tempo}
        onChange={handleRangeChange}
        step="2"
        style={{
          background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${
            ((tempo - 20) / 40) * 100
          }%, #374151 ${((tempo - 20) / 40) * 100}%, #374151 100%)`,
        }}
      />
      <span className="text-cyan-400 font-mono font-semibold text-lg">{`${tempo}bpm`}</span>
    </div>
  );
};

export default TempoSlider;
