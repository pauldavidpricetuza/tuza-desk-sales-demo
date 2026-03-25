import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import {
  TextField,
  Label,
  TextArea as AriaTextArea,
  Text,
  FieldError,
} from "react-aria-components";
import type { TextFieldProps } from "react-aria-components";
import { themeVars } from "#theme/theme.css.js";
import {
  fieldWrapper,
  fieldWrapperFullWidth,
  hintText,
  statusIcon,
  textarea,
  textareaContainer,
  label as labelStyle,
} from "./Textarea.css";

export type TextareaProps = {
  label?: string;
  placeholder?: string;
  hintText?: string;
  errorMessage?: string;
  showStatusIcon?: boolean;
  fullWidth?: boolean;
  rows?: number;
} & Pick<
  TextFieldProps,
  "value" | "onChange" | "isDisabled" | "isInvalid" | "name"
>;

export const Textarea = ({
  label,
  placeholder,
  hintText: hintTextValue,
  errorMessage,
  showStatusIcon = false,
  fullWidth = false,
  rows = 3,
  isInvalid,
  value,
  ...restProps
}: TextareaProps) => {
  const hasError = isInvalid ?? !!errorMessage;

  return (
    <TextField
      className={fullWidth ? fieldWrapperFullWidth : fieldWrapper}
      isInvalid={hasError}
      value={value}
      {...restProps}
    >
      {label && <Label className={labelStyle}>{label}</Label>}
      <div className={textareaContainer}>
        <AriaTextArea
          className={textarea}
          placeholder={placeholder}
          rows={rows}
        />
        {showStatusIcon && (
          <div className={statusIcon}>
            {hasError ? (
              <WarningCircle
                size="1rem"
                color={themeVars.semanticColour.text.errorSecondary}
              />
            ) : (
              <CheckCircle
                size="1rem"
                color={themeVars.semanticColour.text.success}
              />
            )}
          </div>
        )}
      </div>
      {hasError && errorMessage ? (
        <FieldError className={hintText}>{errorMessage}</FieldError>
      ) : (
        hintTextValue && (
          <Text slot="description" className={hintText}>
            {hintTextValue}
          </Text>
        )
      )}
    </TextField>
  );
};

Textarea.displayName = "Textarea";
