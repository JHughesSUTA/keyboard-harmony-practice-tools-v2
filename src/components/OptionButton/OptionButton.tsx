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
      className={`border cursor-pointer rounded py-3 ${
        option.active ? "bg-blue-500 hover:bg-blue-700" : "bg-white hover:bg-blue-100 transition"
      }`}
    >
      {option.label}
    </button>
  );
};

export default OptionButton;
