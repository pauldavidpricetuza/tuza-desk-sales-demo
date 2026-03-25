import { match } from "ts-pattern";
import { Text } from "#ui/Text/index.js";
import {
  statusContainer,
  statusActive,
  statusInactive,
  statusDraft,
} from "./Status.css";

export const Status = ({
  variant,
  text,
}: {
  variant: "active" | "inactive" | "draft";
  text: string;
}) => {
  return (
    <div className={statusContainer}>
      <div
        className={match(variant)
          .with("active", () => statusActive)
          .with("inactive", () => statusInactive)
          .with("draft", () => statusDraft)
          .exhaustive()}
      />
      <Text font="body2" color="brandSecondary">
        {text}
      </Text>
    </div>
  );
};

Status.displayName = "Status";
