import { LockKeyIcon } from "@phosphor-icons/react";
import { Button } from "#ui/Button/index.js";
import { Status } from "#ui/Status/index.js";
import { Text } from "#ui/Text/index.js";
import {
  headerButtonGroup,
  headerContainer,
  headerDateVersion,
  headerDetail,
  headerRight,
  titleBar,
} from "./WorkflowTitleBar.css";
import { dateTimeFormat } from "#utils/dateUtils.js";

const HeaderDetail = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={headerDetail}>
      <Text font="body2" color="brandSecondary">
        {label}
      </Text>
      <Text font="body2">{value}</Text>
    </div>
  );
};

export const WorkflowTitleBar = ({
  title,
  isActive,
  lastUpdated,
  version,
}: {
  title: string;
  isActive: boolean;
  lastUpdated: Date;
  version: string;
}) => {
  return (
    <div className={titleBar}>
      <div className={headerContainer}>
        <Text as="h2" font="heading2">
          {title}
        </Text>
        <Status
          variant={isActive ? "active" : "inactive"}
          text={isActive ? "Active" : "Inactive"}
        />
      </div>
      <div className={headerRight}>
        <div className={headerDateVersion}>
          <HeaderDetail label="Updated:" value={dateTimeFormat(lastUpdated)} />
          <HeaderDetail label="Version:" value={version} />
        </div>
        <div className={headerButtonGroup}>
          <Button variant="secondary">Settings</Button>
          <Button
            variant="secondary"
            leftIcon={<LockKeyIcon size="1rem" />}
            isDisabled
          >
            Locked
          </Button>
        </div>
      </div>
    </div>
  );
};

WorkflowTitleBar.displayName = "WorkflowTitleBar";
