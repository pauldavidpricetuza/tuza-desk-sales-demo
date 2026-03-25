import {
  CrosshairSimpleIcon,
  MinusIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import {
  workflowControlBar,
  workflowControlButton,
  workflowControlShortcut,
  workflowControlShortcutSmaller,
  workflowControlTooltip,
} from "./WorkflowControls.css";
import { Button, Tooltip, TooltipTrigger } from "react-aria-components";
import { Text } from "#ui/Text/index.js";
import React from "react";

const ControlButton = ({
  icon,
  tooltipText,
  keyboardShortcut,
  keyboardshortCutClassName,
}: {
  icon: React.ReactNode;
  tooltipText: string;
  keyboardShortcut: React.ReactNode;
  keyboardshortCutClassName?: string;
}) => {
  return (
    <TooltipTrigger delay={500} closeDelay={0}>
      <Button className={workflowControlButton} aria-label={tooltipText}>
        {icon}
      </Button>
      <Tooltip className={workflowControlTooltip} offset={12}>
        <Text font="body2">{tooltipText}</Text>
        <div
          className={keyboardshortCutClassName ?? workflowControlShortcut}
          aria-label={`Shortcuts available: ${keyboardShortcut}`}
        >
          {keyboardShortcut}
        </div>
      </Tooltip>
    </TooltipTrigger>
  );
};

export const WorkflowControls = () => {
  return (
    <div className={workflowControlBar}>
      <ControlButton
        icon={<PlusIcon size="1rem" />}
        tooltipText="Zoom in"
        keyboardShortcut="+"
      />
      <ControlButton
        icon={<MinusIcon size="1rem" />}
        tooltipText="Zoom out"
        keyboardShortcut="−"
      />
      <ControlButton
        icon={<CrosshairSimpleIcon size="1rem" />}
        tooltipText="Centre"
        keyboardShortcut="C"
        keyboardshortCutClassName={workflowControlShortcutSmaller}
      />
    </div>
  );
};

WorkflowControls.displayName = "WorkflowControls";
