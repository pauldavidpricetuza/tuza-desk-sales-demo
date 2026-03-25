import { Text } from "#ui/Text/index.js";
import { Button } from "#ui/Button/index.js";
import {
  container,
  iconStyle,
  subtitleWrapper,
  buttonWrapper,
  textContent,
} from "./NotFoundMessage.css";
import { LinkBreakIcon } from "@phosphor-icons/react";

type NotFoundMessageProps = {
  showButton?: boolean;
  onButtonClick?: () => void;
  buttonLabel?: string;
};

export const NotFoundMessage = ({
  showButton = false,
  onButtonClick,
  buttonLabel = "Sign in",
}: NotFoundMessageProps) => {
  return (
    <div className={container}>
      <LinkBreakIcon size="2rem" weight="regular" className={iconStyle} />
      <div className={textContent}>
        <Text font="heading1" as="h1" color="brandDefault">
          404 Error.
        </Text>

        <div className={subtitleWrapper}>
          <Text font="heading1" as="p" color="brandSecondary">
            The page you're looking for doesn't exist.
          </Text>
        </div>
      </div>
      {showButton && (
        <div className={buttonWrapper}>
          <Button onClick={onButtonClick}>{buttonLabel}</Button>
        </div>
      )}
    </div>
  );
};

NotFoundMessage.displayName = "NotFoundMessage";
