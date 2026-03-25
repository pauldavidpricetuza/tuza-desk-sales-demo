import { semanticColour } from "#theme/colour.js";
import { sprinkles } from "#theme/sprinkles.css.js";
import { text, fonts, weight as weightOptions } from "#theme/typography.css.js";
import { truncatedTextStyle } from "./Text.css";

type Font = keyof typeof fonts;

// TODO: Only Denim has medium
type FontWeight = keyof typeof weightOptions;

type TextProps = React.HTMLAttributes<HTMLSpanElement> & {
  font: Font;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  weight?: FontWeight;
  color?: keyof typeof semanticColour.text;
  truncate?: boolean;
};

export const Text = ({
  font,
  as: Component = "span",
  color,
  weight,
  truncate,
  children,
}: TextProps) => {
  return (
    <Component
      className={`${text({ font, weight })} ${sprinkles({
        color,
        margin: "spacing-0",
      })} ${truncate ? truncatedTextStyle : ""}`}
    >
      {children}
    </Component>
  );
};

Text.displayName = "Text";
