import useDialog from "../../hooks/useDialog";
import { useEffect } from "react";

type WelcomeDialogProps = {
  shouldShow: boolean;
  onClose: () => void;
};

const WelcomeDialog = ({ shouldShow, onClose }: WelcomeDialogProps) => {
  const { isOpen, dialogRef, openDialog, closeDialog } = useDialog();

  useEffect(() => {
    if (shouldShow && !isOpen) {
      openDialog();
    }
  }, [shouldShow, isOpen, openDialog]);

  const handleClose = () => {
    closeDialog();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/75 bg-slate-800 text-white rounded-lg p-0 border-2 border-cyan-400 max-w-lg mx-4 self-center justify-self-center"
      onClose={handleClose}
    >
      <div className="p-6">
        <h2 className="text-l font-bold text-cyan-400 mb-4">
          🎹 Welcome to the Keyboard Harmony Practice Tool!
        </h2>

        <p className="text-xs md:text-sm mb-3">
          This application is meant to be used as a practice tool for learning
          the different voicings of Phil de Greg's Jazz Keyboard Harmony, and
          building them into muscle memory.
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <h3 className="font-semibold text-cyan-300 mb-2">🎯 How to use:</h3>
            <ul className="list-disc list-inside ml-4 space-y-1 text-xs md:text-sm">
              <li>
                Select the keys and chords you want to practice. Start small!
              </li>
              <li>Adjust the tempo with the slider (20-60 BPM)</li>
              <li>Press the play button to start the randomizer</li>
              <li>
                Watch the display for random key/chord combinations. Play each
                one in your chosen voicing as it changes - gradually increasing
                tempo
              </li>
              <li>
                Once you are able to keep up with the randomizer at 60 BPM, add
                another key and restart the process.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-cyan-300 mb-2">
              ♿ Accessibility:
            </h3>
            <p className="ml-4 text-xs md:text-sm">
              Screen readers will announce chord changes when the randomizer is
              running.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-cyan-500 cursor-pointer hover:bg-cyan-400 text-black font-semibold px-6 py-2 rounded-lg transition-colors"
            autoFocus
          >
            Let's Practice! 🎵
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default WelcomeDialog;
