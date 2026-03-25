import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import {
  TextField,
  Label,
  Input,
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
  input,
  inputContainer,
  label as labelStyle,
} from "./TextInput.css";

export type TextInputProps = {
  label?: string;
  placeholder?: string;
  hintText?: string;
  errorMessage?: string;
  showStatusIcon?: boolean;
  fullWidth?: boolean;
} & Pick<
  TextFieldProps,
  "value" | "onChange" | "isDisabled" | "isInvalid" | "name" | "type"
>;

export const TextInput = ({
  label,
  placeholder,
  hintText: hintTextValue,
  errorMessage,
  showStatusIcon = false,
  fullWidth = false,
  isInvalid,
  value,
  ...restProps
}: TextInputProps) => {
  const hasError = isInvalid ?? !!errorMessage;

  return (
    <TextField
      className={fullWidth ? fieldWrapperFullWidth : fieldWrapper}
      isInvalid={hasError}
      value={value}
      {...restProps}
    >
      {label && <Label className={labelStyle}>{label}</Label>}
      <div className={inputContainer}>
        <Input className={input} placeholder={placeholder} />
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

TextInput.displayName = "TextInput";
