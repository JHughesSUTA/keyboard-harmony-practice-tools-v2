import TempoProvider from "./context/PlayControlsContext";
import Main from "./components/Main/Main";

function App() {
  return (
    <>
      <TempoProvider>
        <Main />
      </TempoProvider>
    </>
  );
}

export default App;
