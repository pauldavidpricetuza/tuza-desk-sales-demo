import { Button } from "#ui/Button/index.js";
import { Modal, ModalActions } from "#ui/Modal/index.js";
import { Text } from "#ui/Text/index.js";
import { signOutModalContent } from "./SignOutModal.css";

export const SignOutModal = ({
  onSignOut,
  onOpenChange,
  isOpen,
}: {
  onSignOut: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  isOpen?: boolean;
}) => {
  return (
    <Modal width="400px" isOpen={isOpen} onOpenChange={onOpenChange}>
      {({ close }) => (
        <>
          <div className={signOutModalContent}>
            <Text font="body1" weight="medium">
              Sign out of your Tuza account?
            </Text>
            <Text font="body1">
              You will need to sign back into Tuza to access your account.
            </Text>
          </div>
          <ModalActions>
            <Button variant="secondary" onClick={() => close()}>
              Cancel
            </Button>
            <Button
              variant="warning"
              onClick={() => {
                onSignOut();
                close();
              }}
            >
              Sign out
            </Button>
          </ModalActions>
        </>
      )}
    </Modal>
  );
};

SignOutModal.displayName = "SignOutModal";
