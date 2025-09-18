import { useState } from "react";

export default function useWelcome() {
  const [showWelcome, setShowWelcome] = useState(() => {
    // Check if user has seen the welcome before
    return !localStorage.getItem("hasSeenWelcome");
  });

  const handleWelcomeClose = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setShowWelcome(false);
  };

  const showWelcomeAgain = () => {
    setShowWelcome(true);
  };

  return {
    showWelcome,
    handleWelcomeClose,
    showWelcomeAgain,
  };
}
