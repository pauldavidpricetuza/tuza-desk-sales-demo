import { match } from "ts-pattern";
import { Text } from "#ui/Text/index.js";
import { nodeBody } from "./NodeBody.css";

export type NodeBodyState = "default" | "active";

export type NodeBodyProps = {
  description: string;
  state?: NodeBodyState;
};

export const NodeBody = ({ description, state = "default" }: NodeBodyProps) => {
  const bodyClass = match(state)
    .with("active", () => nodeBody.active)
    .otherwise(() => nodeBody.default);

  return (
    <div className={bodyClass}>
      <Text font="body2" color="brandSecondary">
        {description}
      </Text>
    </div>
  );
};

NodeBody.displayName = "NodeBody";
