import { match } from "ts-pattern";
import { NodeIcon } from "./NodeIcon";
import { NodeTitleText, NodeTitleTextVariant } from "./NodeTitleText";
import { nodeTitle } from "./NodeTitle.css";

export type NodeTitleState = "default" | "active";

export type NodeTitleProps = {
  title: string;
  type?: string;
  state?: NodeTitleState;
  titleVariant?: NodeTitleTextVariant;
  icon?: React.ReactNode;
};

export const NodeTitle = ({
  title,
  type,
  state = "default",
  titleVariant = "withType",
  icon,
}: NodeTitleProps) => {
  const titleClass = match(state)
    .with("active", () => nodeTitle.active)
    .otherwise(() => nodeTitle.default);

  return (
    <div className={titleClass}>
      <NodeIcon state={state} icon={icon} />
      <NodeTitleText title={title} type={type} variant={titleVariant} />
    </div>
  );
};

NodeTitle.displayName = "NodeTitle";
