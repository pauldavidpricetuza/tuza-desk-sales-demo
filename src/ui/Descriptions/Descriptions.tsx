import {
  Table,
  TableBody,
  TableCell,
  TableColumnHead,
  TableHead,
  TableRow,
} from "#ui/Table/index.js";
import { useId } from "react";

export const Descriptions = ({
  title,
  items,
  showTitle,
  hideInnerBorders,
}: {
  title: string;
  items: { label: React.ReactNode; value: React.ReactNode }[];
  showTitle?: boolean;
  hideInnerBorders?: boolean;
}) => {
  return (
    <Table
      ariaLabel={title}
      selectionMode="none"
      hideHeader={!showTitle}
      hideInnerBorders={hideInnerBorders}
    >
      <TableHead>
        <TableColumnHead
          isRowHeader
          id="label"
          allowsSorting={false}
          width="1fr"
        >
          {title}
        </TableColumnHead>
        <TableColumnHead id="value" allowsSorting={false} width="2fr" />
      </TableHead>
      <TableBody>
        {items.map(({ label, value }, index) => (
          <TableRow
            id={`${title.toLowerCase().replace(/\s+/g, "-")}-row-${useId()}`}
            key={index}
          >
            <TableCell>{label}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

Descriptions.displayName = "Descriptions";
