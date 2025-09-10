import StartButton from "../StartButton/StartButton";
import TempoSlider from "../TempoSlider/TempoSlider";

const Controls = () => {
  return (
    <section className="flex justify-between py-4 mb-4 px-2 md:px-3 rounded">
      <TempoSlider />
      <StartButton />
    </section>
  );
};

export default Controls;
