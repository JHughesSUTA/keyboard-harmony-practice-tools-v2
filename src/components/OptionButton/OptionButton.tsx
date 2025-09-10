import type { Option } from "../../types";

type OptionButtonProps = {
  option: Option;
  toggleActive: (id: number) => void;
};

const OptionButton = ({ option, toggleActive }: OptionButtonProps) => {
  return (
    <button
      key={option.id}
      onClick={() => toggleActive(option.id)}
      className={`border-2 cursor-pointer rounded-lg py-3 font-mono font-semibold transition-all duration-200 ${
        option.active
          ? "bg-cyan-500 border-cyan-400 text-black shadow-md shadow-cyan-400/30 hover:bg-cyan-400"
          : "bg-slate-700 border-slate-500 text-slate-300 hover:bg-slate-600 hover:border-slate-400 hover:text-white"
      }`}
    >
      {option.label}
    </button>
  );
};

export default OptionButton;
