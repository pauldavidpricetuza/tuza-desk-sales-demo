import { match } from "ts-pattern";
import { connectorDot } from "./ConnectorDot.css";

export type ConnectorDotVariant = "default" | "active" | "focus";

export type ConnectorDotProps = {
  variant?: ConnectorDotVariant;
};

export const ConnectorDot = ({ variant = "default" }: ConnectorDotProps) => {
  const dotClass = match(variant)
    .with("active", () => connectorDot.active)
    .with("focus", () => connectorDot.focus)
    .otherwise(() => connectorDot.default);

  return <div className={dotClass} />;
};

ConnectorDot.displayName = "ConnectorDot";
