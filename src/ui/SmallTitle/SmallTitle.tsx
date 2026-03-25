import { CaretDoubleDownIcon } from "@phosphor-icons/react";
import { Text } from "#ui/Text/index.js";
import { icon } from "./SmallTitle.css";
import { sprinkles } from "#theme/sprinkles.css.js";

export const SmallTitle = ({ title }: { title: string }) => {
  return (
    <div
      className={sprinkles({
        display: "flex",
        alignItems: "center",
        gap: "spacing-1",
        paddingBottom: "spacing-2",
      })}
    >
      <CaretDoubleDownIcon size="0.75rem" className={icon} />
      <Text font="heading3" as="h3" color="brandDefault">
        {title}
      </Text>
    </div>
  );
};

SmallTitle.displayName = "SmallTitle";
