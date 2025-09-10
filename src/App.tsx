import PlayControlsProvider from "./context/PlayControlsContext";
import Main from "./components/Main/Main";

function App() {
  return (
    <PlayControlsProvider>
      <Main />
    </PlayControlsProvider>
  );
}

export default App;
