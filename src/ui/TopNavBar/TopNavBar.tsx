import { BreadcrumbItem, Breadcrumbs } from "#ui/Breadcrumbs/index.js";
import { UserProfileMenu } from "#ui/UserProfileMenu/index.js";
import { topNavBar, cogButton } from "./TopNavBar.css";
import { GearIcon } from "@phosphor-icons/react";

type TopNavBarProps = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  breadcrumbs: {
    label: React.ReactNode;
    href: string;
  }[];
  onSignOut: () => void;
  onSettingsClick?: () => void;
  rightActions?: React.ReactNode;
};

export const TopNavBar = ({ user, breadcrumbs, onSignOut, onSettingsClick, rightActions }: TopNavBarProps) => {
  return (
    <div className={topNavBar}>
      <Breadcrumbs>
        {breadcrumbs.map((breadcrumb) => (
          <BreadcrumbItem key={breadcrumb.href} href={breadcrumb.href}>
            {breadcrumb.label}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {rightActions}
        {onSettingsClick && (
          <button className={cogButton} onClick={onSettingsClick} aria-label="Version settings">
            <GearIcon size={18} />
          </button>
        )}
        <UserProfileMenu user={user} onSignOut={onSignOut} />
      </div>
    </div>
  );
};

TopNavBar.displayName = "TopNavBar";
