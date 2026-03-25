import { dialog, modal, modalActions, modalOverlay } from "./Modal.css";
import {
  Modal as ReactAriaModal,
  DialogTrigger,
  Dialog,
  ModalOverlay,
  DialogRenderProps,
} from "react-aria-components";

export const Modal = ({
  children,
  width,
  isOpen,
  onOpenChange,
}: {
  children: React.ReactNode | ((opts: DialogRenderProps) => React.ReactNode);
  width?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}) => {
  return (
    <ModalOverlay
      className={modalOverlay}
      isDismissable={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ReactAriaModal className={modal} style={{ width }}>
        <Dialog className={dialog}>
          {({ close }) => {
            return typeof children === "function"
              ? children({ close })
              : children;
          }}
        </Dialog>
      </ReactAriaModal>
    </ModalOverlay>
  );
};

export const ModalTrigger = DialogTrigger;

export const ModalActions = ({ children }: { children: React.ReactNode }) => {
  return <div className={modalActions}>{children}</div>;
};

Modal.displayName = "Modal";
