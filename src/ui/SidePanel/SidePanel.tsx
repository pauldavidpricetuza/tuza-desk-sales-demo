import { TitleBar } from "#ui/TitleBar/index.js";
import { dialog, dialogExiting, sidePanelContent } from "./SidePanel.css";
import { Dialog } from "react-aria-components";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

export const SidePanel = ({
  children,
  isOpen,
  title,
  hasSmallTitle,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  hasSmallTitle?: boolean;
  onClose: () => void;
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isExiting, setIsExiting] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsExiting(false);
    } else {
      // When isOpen changes to false, trigger exit animation
      setIsExiting(true);
      const timeout = setTimeout(() => {
        setIsExiting(false);
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Dialog
      className={clsx(dialog, { [dialogExiting]: isExiting })}
      aria-label={title}
    >
      <TitleBar
        pageTitle={title}
        hasCloseButton
        onClose={onClose}
        small={hasSmallTitle}
      />
      <div className={sidePanelContent}>{children}</div>
    </Dialog>
  );
};

SidePanel.displayName = "SidePanel";
