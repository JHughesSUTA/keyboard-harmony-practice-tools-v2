import StartButton from "../StartButton/StartButton";
import TempoSlider from "../TempoSlider/TempoSlider";

const Controls = () => {
  return (
    <section className="flex justify-between py-4">
      <TempoSlider />
      <StartButton />
    </section>
  );
};

export default Controls;
