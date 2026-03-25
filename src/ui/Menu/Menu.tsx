import { CaretRightIcon } from "@phosphor-icons/react";
import {
  caretContainer,
  menu,
  menuItem,
  menuNoResults,
  popover,
} from "./Menu.css";
import {
  MenuTrigger as ReactAriaMenuTrigger,
  Menu as ReactAriaMenu,
  MenuItem as ReactAriaMenuItem,
  Popover,
  Focusable,
} from "react-aria-components";
import { Tooltip } from "#ui/Tooltip/index.js";

export const MenuTrigger = ReactAriaMenuTrigger;

export const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <Popover className={popover}>
      <ReactAriaMenu className={menu}>{children}</ReactAriaMenu>
    </Popover>
  );
};

export const SubMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <Popover className={popover} offset={12}>
      <ReactAriaMenu
        className={menu}
        renderEmptyState={() => <div className={menuNoResults}>No items</div>}
      >
        {children}
      </ReactAriaMenu>
    </Popover>
  );
};

export const MenuItem = ({
  onAction,
  children,
  hasSubMenu,
  isDisabled,
  tooltip,
}: {
  onAction?: () => void;
  children: React.ReactNode;
  hasSubMenu?: boolean;
  isDisabled?: boolean;
  tooltip?: string;
}) => {
  const MenuItemComponent = (
    <ReactAriaMenuItem
      className={menuItem}
      onAction={onAction}
      isDisabled={isDisabled}
    >
      {children}
      {hasSubMenu && (
        <div className={caretContainer}>
          <CaretRightIcon size="0.75rem" />
        </div>
      )}
    </ReactAriaMenuItem>
  );

  if (tooltip) {
    return (
      <Tooltip tooltipText={tooltip}>
        <Focusable>{MenuItemComponent}</Focusable>
      </Tooltip>
    );
  }
  return MenuItemComponent;
};

Menu.displayName = "Menu";
