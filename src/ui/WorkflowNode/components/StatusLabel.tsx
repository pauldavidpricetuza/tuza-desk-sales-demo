import { match } from "ts-pattern";
import { statusLabel, statusDot, statusText } from "./StatusLabel.css";

export type StatusLabelStatus = "active" | "neutral" | "negative" | "review";

export type StatusLabelProps = {
  status: StatusLabelStatus;
};

export const StatusLabel = ({ status }: StatusLabelProps) => {
  const labelText = match(status)
    .with("active", () => "Active")
    .with("neutral", () => "Neutral")
    .with("negative", () => "Negative")
    .with("review", () => "Review")
    .exhaustive();

  return (
    <div className={statusLabel[status]}>
      <div className={statusDot[status]} />
      <span className={statusText[status]}>{labelText}</span>
    </div>
  );
};

StatusLabel.displayName = "StatusLabel";
