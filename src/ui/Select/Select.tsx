import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { CaretDownIcon, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { themeVars } from "#theme/theme.css.js";
import {
  fieldWrapper,
  fieldWrapperFullWidth,
  hintText as hintTextStyle,
  statusIcon,
  trigger,
  triggerValue,
  triggerPlaceholder,
  caretIcon,
  caretIconOpen,
  listbox,
  listboxItem,
  listboxItemSelected,
  label as labelStyle,
} from "./Select.css";

export type SelectItem = { value: string; label: string };

export type SelectProps = {
  label?: string;
  hintText?: string;
  errorMessage?: string;
  showStatusIcon?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  items: SelectItem[];
};

export const Select = ({
  label,
  hintText: hintTextValue,
  errorMessage,
  showStatusIcon = false,
  fullWidth = false,
  placeholder,
  value,
  onChange,
  isDisabled,
  isInvalid,
  items,
}: SelectProps) => {
  const hasError = isInvalid ?? !!errorMessage;
  const selectedItem = items.find((i) => i.value === value);

  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const selectedIdx = items.findIndex((i) => i.value === value);
    setFocusedIndex(selectedIdx >= 0 ? selectedIdx : 0);
    const closeOnScroll = () => setOpen(false);
    window.addEventListener("scroll", closeOnScroll, true);
    window.addEventListener("resize", closeOnScroll);
    return () => {
      window.removeEventListener("scroll", closeOnScroll, true);
      window.removeEventListener("resize", closeOnScroll);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        listboxRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((i) => (i < items.length - 1 ? i + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((i) => (i > 0 ? i - 1 : items.length - 1));
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < items.length) {
          handleSelect(items[focusedIndex]);
        }
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, focusedIndex, items]);

  const handleSelect = (item: SelectItem) => {
    onChange?.(item.value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const wrapperClass = fullWidth ? fieldWrapperFullWidth : fieldWrapper;

  return (
    <div
      className={wrapperClass}
      data-invalid={hasError || undefined}
      data-disabled={isDisabled || undefined}
    >
      {label && <label className={labelStyle}>{label}</label>}
      <button
        ref={triggerRef}
        type="button"
        className={trigger}
        disabled={isDisabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          if (!isDisabled) setOpen((o) => !o);
        }}
      >
        {selectedItem ? (
          <span className={triggerValue}>{selectedItem.label}</span>
        ) : (
          <span className={triggerPlaceholder}>
            {placeholder ?? "Select…"}
          </span>
        )}
        {showStatusIcon && (
          <span className={statusIcon}>
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
          </span>
        )}
        <span className={open ? caretIconOpen : caretIcon}>
          <CaretDownIcon
            size="0.75rem"
            color={themeVars.semanticColour.text.brandDefault}
          />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            ref={listboxRef}
            className={listbox}
            role="listbox"
            style={{
              position: "fixed",
              zIndex: 99999,
              top: pos.top,
              left: pos.left,
              width: pos.width,
            }}
          >
            {items.map((item, idx) => (
              <div
                key={item.value}
                role="option"
                aria-selected={item.value === value}
                data-focused={idx === focusedIndex || undefined}
                className={`${listboxItem}${item.value === value ? ` ${listboxItemSelected}` : ""}`}
                onClick={() => handleSelect(item)}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setFocusedIndex(idx)}
              >
                {item.label}
              </div>
            ))}
          </div>,
          document.body,
        )}

      {hasError && errorMessage ? (
        <span className={hintTextStyle}>{errorMessage}</span>
      ) : (
        hintTextValue && <span className={hintTextStyle}>{hintTextValue}</span>
      )}
    </div>
  );
};

Select.displayName = "Select";
