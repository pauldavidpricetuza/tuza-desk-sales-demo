import { CaretRightIcon, XIcon } from "@phosphor-icons/react";
import { Text } from "#ui/Text/index.js";
import {
  caretContainer,
  closeButton,
  rightContent,
  titleBar,
  titleBarSmall,
  titleBarText,
} from "./TitleBar.css";
import { Button } from "react-aria-components";

export const TitleBar = ({
  pageTitle,
  secondaryInfo,
  small,
  hasCloseButton,
  onClose,
  children,
}: {
  pageTitle: string;
  secondaryInfo?: string;
  small?: boolean;
  hasCloseButton?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <div className={small ? titleBarSmall : titleBar}>
      <div className={titleBarText}>
        <div className={caretContainer}>
          <CaretRightIcon size="1rem" />
        </div>
        <Text
          as={small ? "h2" : "h1"}
          font={small ? "heading2" : "heading1"}
          truncate
        >
          {pageTitle}
        </Text>
        {secondaryInfo && (
          <Text as="h2" font="heading1" color="brandTertiary" truncate>
            {secondaryInfo}
          </Text>
        )}
      </div>
      <div className={rightContent}>
        {children}
        {hasCloseButton && (
          <Button className={closeButton} onPress={onClose} aria-label="Close">
            <XIcon size="1rem" />
          </Button>
        )}
      </div>
    </div>
  );
};

TitleBar.displayName = "TitleBar";
