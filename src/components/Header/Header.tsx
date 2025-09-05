import { FaPlay } from "react-icons/fa";

const Header = () => {
  return (
    <section className="flex justify-between py-4">
      <div>
        <input
          name="tempo"
          className="tempo-container__slider"
          type="range"
          autocomplete="off"
          min="20"
          max="80"
          value="30"
          // onChange={tempoChange}
          step="2"
        />
      </div>
      <button className="cursor-pointer">
        <FaPlay size={30} />
      </button>
    </section>
  );
};

export default Header;
