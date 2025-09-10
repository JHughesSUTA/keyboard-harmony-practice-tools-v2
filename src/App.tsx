import PlayControlsProvider from "./context/PlayControlsContext";
import Main from "./components/Main/Main";

function App() {
  return (
    <PlayControlsProvider>
      <div className="flex justify-center items-center h-screen">
        <Main />
      </div>
    </PlayControlsProvider>
  );
}

export default App;
