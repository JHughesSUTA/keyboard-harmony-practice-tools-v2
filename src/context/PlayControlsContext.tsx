import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";

type PlayControlsContextType = {
  tempo: number;
  setTempo: (tempo: number) => void;
  running: boolean;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlayControlsContext = createContext<PlayControlsContextType | undefined>(
  undefined
);

type PlayControlsProviderProps = {
  children: ReactNode;
};

export default function PlayControlsProvider({
  children,
}: PlayControlsProviderProps) {
  const [running, setRunning] = useState<boolean>(false);
  const [tempo, setTempo] = useState<number>(() => {
    const stored = sessionStorage.getItem("tempo");
    if (stored) {
      return JSON.parse(stored);
    } else {
      return 20;
    }
  });

  useEffect(() => {
    sessionStorage.setItem("tempo", JSON.stringify(tempo));
  }, [tempo]);

  return (
    <PlayControlsContext.Provider
      value={{ tempo, setTempo, running, setRunning }}
    >
      {children}
    </PlayControlsContext.Provider>
  );
}

export function usePlayControls(): PlayControlsContextType {
  const context = useContext(PlayControlsContext);

  if (!context) {
    throw new Error("usePlayControls must be used within a PlayControlsProvider");
  }

  return context;
}
