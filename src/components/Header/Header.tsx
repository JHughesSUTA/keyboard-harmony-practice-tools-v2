import { FaPlay, FaStop } from "react-icons/fa";

type HeaderProps = {
  handlePlayButtonClick: () => void;
  running: boolean;
};

const Header = ({ handlePlayButtonClick, running }: HeaderProps) => {
  return (
    <section className="flex justify-between py-4">
      <div>
        <input
          name="tempo"
          className="tempo-container__slider"
          type="range"
          autoComplete="off"
          min="20"
          max="80"
          value="30"
          // onChange={tempoChange}
          step="2"
        />
      </div>
      <button onClick={handlePlayButtonClick} className="cursor-pointer">
        {running ? <FaStop size={30} /> : <FaPlay size={30} />}
      </button>
    </section>
  );
};

export default Header;
