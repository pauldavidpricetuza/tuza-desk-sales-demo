import { tag, tagGroup } from "./TagGroup.css";
import {
  TagGroup as ReactAriaTagGroup,
  Tag as ReactAriaTag,
  TagList,
} from "react-aria-components";

export const TagGroup = ({
  ariaLabel,
  children,
}: {
  ariaLabel: string;
  children: React.ReactNode;
}) => {
  return (
    <ReactAriaTagGroup aria-label={ariaLabel}>
      <TagList className={tagGroup}>{children}</TagList>
    </ReactAriaTagGroup>
  );
};

export const Tag = ({ children }: { children: React.ReactNode }) => {
  return <ReactAriaTag className={tag}>{children}</ReactAriaTag>;
};

TagGroup.displayName = "TagGroup";
