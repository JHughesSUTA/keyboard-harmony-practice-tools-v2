import { usePlayControls } from "../../context/PlayControlsContext";
import type { ChangeEvent } from "react";

const TempoSlider = () => {
  const { tempo, setTempo } = usePlayControls();

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempo(Number(e.target.value));
  };

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="tempo-slider" className="sr-only">
        Tempo (beats per minute)
      </label>
      <input
        id="tempo-slider"
        name="tempo"
        className="w-32 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        aria-label="Tempo control in beats per minute"
        aria-describedby="tempo-display"
        aria-valuemin={20}
        aria-valuemax={60}
        aria-valuenow={tempo}
        aria-valuetext={`${tempo} beats per minute`}
        type="range"
        role="slider"
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
      <span
        id="tempo-display"
        className="text-cyan-400 font-mono font-semibold text-lg"
        aria-live="polite"
      >{`${tempo}bpm`}</span>
    </div>
  );
};

export default TempoSlider;
