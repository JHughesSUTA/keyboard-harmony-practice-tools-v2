import PlayControlsProvider from "./context/PlayControlsContext";
import Main from "./components/Main/Main";

function App() {
  return (
    <PlayControlsProvider>
      <div className="flex justify-center items-center min-h-dvh bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Main />
      </div>
    </PlayControlsProvider>
  );
}

export default App;
