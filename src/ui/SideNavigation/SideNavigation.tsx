import { Icon, SidebarSimpleIcon } from "@phosphor-icons/react";
import {
  navigationItem,
  navigationItemActive,
  navigationItemLabel,
  navigationItemIcon,
  navigationItemsList,
  favIconContainer,
  navigationContent,
  collapsedSideNavigation,
  expandedSideNavigation,
  expandButtonContainer,
  navigationCompactItem,
} from "./SideNavigation.css";
import { Button, Link } from "react-aria-components";
import { Text } from "#ui/Text/index.js";
import React from "react";
import { clsx } from "clsx";
import { Tooltip } from "#ui/Tooltip/index.js";

const NavigationItemButton = ({
  icon,
  label,
  isActive,
  to,
  onClick,
  isCompact,
}: {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  to?: string;
  onClick?: () => void;
  isCompact?: boolean;
}) => {
  const Component = to ? Link : Button;
  return (
    <Component
      className={clsx(
        navigationItem,
        { [navigationItemActive]: isActive },
        isCompact ? navigationCompactItem : undefined,
      )}
      aria-label={label}
      href={to}
      onPress={onClick}
    >
      {icon}
      <div className={navigationItemLabel}>
        <Text font="body1">{label}</Text>
      </div>
    </Component>
  );
};

export const NavigationItem = ({
  icon: IconComponent,
  label,
  isActive,
  onClick,
  to,
  isExpanded,
}: {
  icon: Icon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  to?: string;
  isExpanded?: boolean;
}) => {
  return (
    <Tooltip tooltipText={label} isDisabled={isExpanded}>
      <NavigationItemButton
        icon={<IconComponent className={navigationItemIcon} size="1rem" />}
        label={label}
        isActive={isActive}
        onClick={onClick}
        to={to}
      />
    </Tooltip>
  );
};

export const SideNavigation = ({
  companyLogo,
  companyName,
  companyLink,
  isExpanded,
  onExpandChange,
  onLogoClick,
  children,
}: {
  companyLogo: React.ReactNode;
  companyName: string;
  companyLink: string;
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={isExpanded ? expandedSideNavigation : collapsedSideNavigation}
    >
      <div className={favIconContainer}>
        <NavigationItemButton
          icon={<div className={navigationItemIcon}>{companyLogo}</div>}
          label={companyName}
          isCompact
          to={companyLink}
        />
      </div>
      <div className={navigationContent}>
        <div className={navigationItemsList}>{children}</div>
        <div className={expandButtonContainer}>
          <NavigationItem
            onClick={() => onExpandChange(!isExpanded)}
            icon={SidebarSimpleIcon}
            label={isExpanded ? "Collapse menu" : "Open menu"}
          />
        </div>
      </div>
    </div>
  );
};

SideNavigation.displayName = "SideNavigation";
