import { useState, useRef, useEffect } from "react";

export default function useDialog(initialOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = () => {
    setIsOpen(true);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    setIsOpen(false);
    dialogRef.current?.close();
  };

  // Handle ESC key and backdrop clicks
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setIsOpen(false);
    };

    const handleClick = (e: MouseEvent) => {
      // Close when clicking on backdrop (outside dialog content)
      if (e.target === dialog) {
        closeDialog();
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("click", handleClick);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("click", handleClick);
    };
  }, []);

  return { isOpen, dialogRef, openDialog, closeDialog };
}
