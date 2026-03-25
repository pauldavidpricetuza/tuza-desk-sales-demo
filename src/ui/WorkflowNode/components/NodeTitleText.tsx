import { Text } from "#ui/Text/index.js";
import { titleTextWrapper } from "./NodeTitleText.css";

export type NodeTitleTextVariant = "default" | "withType" | "groupChild";

export type NodeTitleTextProps = {
  title: string;
  type?: string;
  variant?: NodeTitleTextVariant;
};

export const NodeTitleText = ({
  title,
  type,
  variant = "default",
}: NodeTitleTextProps) => {
  const showType = variant !== "default" && type;
  const font = variant === "groupChild" ? "body1" : "heading2";

  return (
    <div className={titleTextWrapper}>
      <Text font={font} color="brandDefault">
        {title}
      </Text>
      {showType && (
        <Text font={font} color="brandSecondary">
          {`: ${type}`}
        </Text>
      )}
    </div>
  );
};

NodeTitleText.displayName = "NodeTitleText";
