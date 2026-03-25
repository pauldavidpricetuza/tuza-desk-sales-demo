import {
  Tabs as ReactAriaTabs,
  TabList as ReactAriaTabList,
  Tab as ReactAriaTab,
  TabPanel as ReactAriaTabPanel,
  SelectionIndicator,
} from "react-aria-components";
import {
  tab,
  tabContent,
  tabsContainer,
  tabSelectionIndicator,
  tabsList,
} from "./Tabs.css";
import { SkeletonText } from "#ui/Skeleton/index.js";

export const Tabs = ({
  children,
  selectedKey,
}: {
  children: React.ReactNode;
  selectedKey?: string;
}) => (
  <ReactAriaTabs className={tabsContainer} selectedKey={selectedKey}>
    {children}
  </ReactAriaTabs>
);

export const TabList = ({ children }: { children: React.ReactNode }) => (
  <ReactAriaTabList className={tabsList}>{children}</ReactAriaTabList>
);

export const Tab = ({
  id,
  children,
  href,
}: {
  id: string;
  children: string;
  href?: string;
}) => (
  <ReactAriaTab className={tab} id={id} href={href}>
    <span data-text={children} className={tabContent}>
      {children}
    </span>
    <SelectionIndicator className={tabSelectionIndicator} />
  </ReactAriaTab>
);

export const TabSkeleton = ({
  id,
  children,
}: {
  id: string;
  children: string;
}) => (
  <ReactAriaTab className={tab} id={id}>
    <span data-text={children} className={tabContent}>
      <SkeletonText text={children} />
    </span>
    <SelectionIndicator className={tabSelectionIndicator} />
  </ReactAriaTab>
);

export const TabPanel = ReactAriaTabPanel;

Tabs.displayName = "Tabs";
