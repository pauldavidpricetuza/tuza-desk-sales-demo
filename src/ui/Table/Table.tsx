import {
  Cell,
  Column,
  Row,
  Table as ReactAriaTable,
  TableBody as ReactAriaTableBody,
  TableHeader,
  SortDescriptor,
  SelectionMode,
  ResizableTableContainer,
  ColumnResizer,
  Group,
  Focusable,
  ColumnProps,
} from "react-aria-components";
import {
  resizer,
  sortIconAscending,
  sortIconDescending,
  sortIconInvisible,
  table,
  tableCell,
  tableColumnHeader,
  cellNoBorder,
  tableColumnHeaderClickable,
  tableColumnHeaderContent,
  container,
  tableHeader,
  tableNoResults,
  tablePagination,
  tableRow,
  tableHideInnerBorders,
  tableContainer,
  tableHideHeader,
} from "./Table.css";
import { match } from "ts-pattern";
import range from "lodash/range";
import { ArrowDownIcon } from "@phosphor-icons/react";
import { TextLink } from "#ui/TextLink/index.js";
import { Text } from "#ui/Text/index.js";
import { sprinkles } from "#theme/sprinkles.css.js";
import { clsx } from "clsx";
import { Skeleton } from "#ui/Skeleton/Skeleton.js";
import { Tooltip } from "#ui/Tooltip/index.js";

type Pagination = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
};

type TableProps = {
  children: React.ReactNode;
  onSortChange?: (newSortDescriptor: SortDescriptor) => void;
  sortDescriptor?: SortDescriptor;
  selectionMode?: SelectionMode;
  pagination?: Pagination;
  ariaLabel: string;
  hideInnerBorders?: boolean;
  hideHeader?: boolean;
};

export type { SortDescriptor };

export const Table = ({
  children,
  onSortChange,
  sortDescriptor,
  ariaLabel,
  selectionMode = "none",
  hideInnerBorders = false,
  hideHeader = false,
  pagination,
}: TableProps) => {
  return (
    <div className={container}>
      <ResizableTableContainer
        className={clsx({ [tableContainer]: !hideInnerBorders })}
      >
        <ReactAriaTable
          aria-label={ariaLabel}
          className={clsx(table, {
            [tableHideInnerBorders]: hideInnerBorders,
            [tableHideHeader]: hideHeader,
          })}
          selectionMode={selectionMode}
          onSortChange={(newSortDescriptor) => {
            onSortChange?.(newSortDescriptor);
          }}
          sortDescriptor={sortDescriptor}
        >
          {children}
        </ReactAriaTable>
      </ResizableTableContainer>
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          itemsPerPage={pagination.itemsPerPage}
          totalItems={pagination.totalItems}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
};

export const TableHead = ({ children }: { children: React.ReactNode }) => {
  return <TableHeader className={tableHeader}>{children}</TableHeader>;
};

export const TableColumnHead = ({
  children,
  isRowHeader,
  allowsSorting = true,
  id,
  width,
  minWidth,
  maxWidth,
}: {
  children?: React.ReactNode;
  isRowHeader?: boolean;
  allowsSorting?: boolean;
  id: string;
} & Pick<ColumnProps, "width" | "minWidth" | "maxWidth">) => {
  return (
    <Column
      className={clsx(tableColumnHeader, {
        [tableColumnHeaderClickable]: allowsSorting,
        [cellNoBorder]: !children,
      })}
      allowsSorting={allowsSorting}
      id={id}
      isRowHeader={isRowHeader}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
    >
      {({ sortDirection }) => (
        <>
          <Group className={tableColumnHeaderContent} tabIndex={-1}>
            {children}
            {allowsSorting && (
              <ArrowDownIcon
                className={match(sortDirection)
                  .with("ascending", () => sortIconAscending)
                  .with("descending", () => sortIconDescending)
                  .with(undefined, () => sortIconInvisible)
                  .exhaustive()}
              />
            )}
          </Group>
          <ColumnResizer className={resizer} />
        </>
      )}
    </Column>
  );
};

export const TableBody = <T extends object>({
  children,
  items,
}: {
  children: React.ReactNode | ((item: T) => React.ReactNode);
  items?: T[];
}) => {
  return (
    <ReactAriaTableBody
      items={items}
      renderEmptyState={() => <div className={tableNoResults}>No results</div>}
      className={tableCell}
    >
      {children}
    </ReactAriaTableBody>
  );
};

export const TableBodySkeleton = ({
  rows = 3,
  columns,
}: {
  rows?: number;
  columns: number;
}) => {
  const skeletonCells = range(0, columns).map((i) => (
    <TableCell key={`skeleton-cell-${i}`}>
      <Skeleton height={16} width={"100%"} />
    </TableCell>
  ));

  const skeletonRows = range(0, rows).map((i) => (
    <TableRow key={`skeleton-row-${i}`} id={`skeleton-row-${i}`}>
      {skeletonCells}
    </TableRow>
  ));

  return <ReactAriaTableBody>{skeletonRows}</ReactAriaTableBody>;
};

export const TableRow = ({
  children,
  isDisabled,
  tooltip,
  id,
  href,
  onAction,
}: {
  children: React.ReactNode;
  isDisabled?: boolean;
  tooltip?: string;
  id: string;
  href?: string;
  onAction?: () => void;
}) => {
  const rowComponent = (
    <Row className={tableRow} id={id} href={href} isDisabled={isDisabled} style={onAction ? { cursor: 'pointer' } : undefined} onAction={onAction}>
      {children}
    </Row>
  );

  if (!tooltip) {
    return rowComponent;
  }

  return (
    <Tooltip tooltipText={tooltip} placement="top">
      <Focusable>{rowComponent}</Focusable>
    </Tooltip>
  );
};

export const TableCell = ({
  children,
  isActionColumn,
}: {
  children: React.ReactNode;
  isActionColumn?: boolean;
}) => {
  return (
    <Cell
      className={clsx(tableCell, {
        [cellNoBorder]: isActionColumn,
      })}
    >
      {children}
    </Cell>
  );
};

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}: Pagination) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage * itemsPerPage >= totalItems;

  if (isFirstPage && isLastPage) {
    return (
      <Text font="body2" color="brandSecondary">
        {totalItems} results
      </Text>
    );
  }

  return (
    <div className={tablePagination}>
      <Text font="body2" color="brandSecondary">
        {(currentPage - 1) * itemsPerPage + 1} –{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
        results
      </Text>
      <div className={sprinkles({ display: "flex", gap: "spacing-2" })}>
        <TextLink
          isDisabled={isFirstPage}
          onClick={() => onPageChange?.(currentPage - 1)}
        >
          Previous
        </TextLink>
        <TextLink
          isDisabled={isLastPage}
          onClick={() => onPageChange?.(currentPage + 1)}
        >
          Next
        </TextLink>
      </div>
    </div>
  );
};

Table.displayName = "Table";
