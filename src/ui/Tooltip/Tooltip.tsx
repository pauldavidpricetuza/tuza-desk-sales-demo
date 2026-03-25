import { Text } from "#ui/Text/index.js";
import { tooltip, tooltipButton } from "./Tooltip.css";
import {
  Button,
  Tooltip as ReactAriaTooltip,
  TooltipTrigger,
} from "react-aria-components";

export const Tooltip = ({
  tooltipText,
  isDisabled,
  children,
  placement = "right",
  // Use this prop when the children is not a focusable element
  shouldAddFocusableToTrigger = false,
}: {
  isDisabled?: boolean;
  tooltipText?: string;
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  shouldAddFocusableToTrigger?: boolean;
}) => {
  // If the children is not a focusable element we wrap it in a Button to make it focusable
  // This is because react-aria requires the trigger to be focusable for accessibility reasons
  const triggerElement = shouldAddFocusableToTrigger ? (
    <Button className={tooltipButton}>{children}</Button>
  ) : (
    children
  );

  return (
    <TooltipTrigger delay={250} closeDelay={0} isDisabled={isDisabled}>
      {triggerElement}
      <ReactAriaTooltip
        className={tooltip}
        placement={placement}
        offset={8}
        containerPadding={0}
      >
        <Text font="body2">{tooltipText}</Text>
      </ReactAriaTooltip>
    </TooltipTrigger>
  );
};

Tooltip.displayName = "Tooltip";
