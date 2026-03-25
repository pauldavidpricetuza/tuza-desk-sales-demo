import clsx from "clsx";
import { semanticColour } from "#theme/colour.js";
import { button, buttonRecipe } from "./Button.css";
import { Button as ReactAriaButton } from "react-aria-components";

type ButtonProps = {
  isDisabled?: boolean;
  onClick?: () => void;
  variant?: keyof typeof semanticColour.button;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  form?: string;
  loading?: boolean;
  /** Merged after design-system button styles (e.g. layout overrides). */
  className?: string;
  title?: string;
  /** When set, renders `data-open="true" | "false"` for styling (e.g. Notes toggle). */
  dataOpen?: boolean;
};

export const Button = ({
  onClick,
  variant = "primary",
  isDisabled,
  leftIcon,
  rightIcon,
  children,
  type = "button",
  form,
  loading = false,
  className,
  title,
  dataOpen,
}: ButtonProps) => {
  return (
    <ReactAriaButton
      type={type}
      onPress={onClick}
      isDisabled={isDisabled}
      className={clsx(button, buttonRecipe({ variant }), className)}
      form={form}
      isPending={loading}
      title={title}
      {...(dataOpen !== undefined ? { 'data-open': dataOpen ? 'true' : 'false' } : {})}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </ReactAriaButton>
  );
};

Button.displayName = "Button";
