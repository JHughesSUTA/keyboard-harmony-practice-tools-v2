import KeyOptions from "../KeyOptions/KeyOptions";
import ChordOptions from "../ChordOptions/ChordOptions";
import Display from "../Display/Display";
import Header from "../Header/Header";

const Main = () => {
  return (
    <main className="max-w-sm md:max-w-2xl xl:max-w-6xl mx-auto bg-gray-300 px-6">
      <Header />
      <KeyOptions />
      <Display />
      <ChordOptions />
    </main>
  );
};

export default Main;
