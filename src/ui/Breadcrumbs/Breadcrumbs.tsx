import {
  breadcrumbItem,
  breadcrumbs,
  breadcrumbDivider,
  breadcrumbLink,
} from "./Breadcrumbs.css";
import {
  Breadcrumb,
  Breadcrumbs as ReactAriaBreadcrumbs,
  Link,
} from "react-aria-components";

type BreadcrumbsProps = {
  children: React.ReactNode;
};

export const Breadcrumbs = ({ children }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumbs">
      <ReactAriaBreadcrumbs className={breadcrumbs}>
        {children}
      </ReactAriaBreadcrumbs>
    </nav>
  );
};
export const BreadcrumbItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) => {
  return (
    <Breadcrumb className={breadcrumbItem}>
      <div aria-hidden="true" className={breadcrumbDivider}>
        /
      </div>
      <Link className={breadcrumbLink} href={href}>
        {children}
      </Link>
    </Breadcrumb>
  );
};

Breadcrumbs.displayName = "Breadcrumbs";
