import { separator } from "./Separator.css";
import { Separator as ReactAriaSeparator } from "react-aria-components";

export const Separator = () => {
  return <ReactAriaSeparator className={separator} />;
};

Separator.displayName = "Separator";
