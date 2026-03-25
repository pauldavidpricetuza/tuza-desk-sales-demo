import { match } from "ts-pattern";
import { AlignBottomIcon } from "@phosphor-icons/react";
import { nodeIcon } from "./NodeIcon.css";

export type NodeIconState = "default" | "active";

export type NodeIconProps = {
  state?: NodeIconState;
  icon?: React.ReactNode;
};

export const NodeIcon = ({ state = "default", icon }: NodeIconProps) => {
  const iconClass = match(state)
    .with("active", () => nodeIcon.active)
    .otherwise(() => nodeIcon.default);

  return (
    <div className={iconClass}>{icon ?? <AlignBottomIcon size="1rem" />}</div>
  );
};

NodeIcon.displayName = "NodeIcon";
