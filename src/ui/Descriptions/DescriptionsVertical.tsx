import { sprinkles } from "#theme/sprinkles.css.js";
import {
  Table,
  TableBody,
  TableCell,
  TableColumnHead,
  TableHead,
  TableRow,
} from "#ui/Table/index.js";
import { Text } from "#ui/Text/index.js";
import { useId } from "react";

export const DescriptionsVertical = ({
  title,
  items,
  showTitle,
}: {
  title: string;
  items: { label: React.ReactNode; value: React.ReactNode }[];
  showTitle?: boolean;
}) => {
  return (
    <Table
      ariaLabel={title}
      selectionMode="none"
      hideInnerBorders
      hideHeader={!showTitle}
    >
      <TableHead>
        <TableColumnHead isRowHeader id="descriptions" allowsSorting={false}>
          {title}
        </TableColumnHead>
      </TableHead>
      <TableBody>
        {items.map(({ label, value }, index) => (
          <TableRow
            id={`${title.toLowerCase().replace(/\s+/g, "-")}-row-${useId()}`}
            key="descriptions-row"
          >
            <TableCell>
              <div
                key={index}
                className={sprinkles({
                  display: "flex",
                  flexDirection: "column",
                })}
              >
                <Text font="body2" color="brandDefault">
                  {label}
                </Text>
                <Text font="body2" color="brandSecondary">
                  {value || "-"}
                </Text>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

DescriptionsVertical.displayName = "DescriptionsVertical";
