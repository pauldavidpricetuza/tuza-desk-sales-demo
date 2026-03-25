import { textLink } from "./TextLink.css";
import { Link } from "react-aria-components";

type TextLinkProps = {
  isDisabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export const TextLink = ({ onClick, isDisabled, children }: TextLinkProps) => {
  return (
    <Link onPress={onClick} isDisabled={isDisabled} className={textLink}>
      {children}
    </Link>
  );
};

TextLink.displayName = "TextLink";
