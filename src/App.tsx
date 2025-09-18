import PlayControlsProvider from "./context/PlayControlsContext";
import Main from "./components/Main/Main";
import WelcomeDialog from "./components/WelcomeDialog/WelcomeDialog";
import useWelcome from "./hooks/useWelcome";

function App() {
  const { showWelcome, handleWelcomeClose } = useWelcome();

  return (
    <PlayControlsProvider>
      <div className="flex justify-center items-center min-h-dvh bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Main />
        <WelcomeDialog shouldShow={showWelcome} onClose={handleWelcomeClose} />
      </div>
    </PlayControlsProvider>
  );
}

export default App;
