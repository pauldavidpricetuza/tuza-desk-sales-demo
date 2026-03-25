import { FunnelSimpleIcon, XIcon } from "@phosphor-icons/react";
import { Menu, MenuItem, MenuTrigger, SubMenu } from "#ui/Menu/Menu.js";
import {
  appliedFilter,
  appliedFilterContainer,
  filterButton,
  filterContainer,
  filterDeleteButton,
  popoverCalendar,
} from "./Filter.css";
import { Button, Popover, SubmenuTrigger } from "react-aria-components";
import { useCallback, useEffect, useState } from "react";
import { Calendar } from "#ui/Calendar/index.js";
import { match } from "ts-pattern";

type Option = {
  group: string;
  label: string;
  value: string;
};

type FilterItem = {
  label: string;
  options?: Option[];
  filterType: "calendar" | "select";
  selectionType?: "single" | "multiple";
};

const isEqualOption = (a: Option, b: Option) =>
  a.group === b.group && a.label === b.label && a.value === b.value;

const FilterSelect = ({
  filter,
  applyFilter,
}: {
  filter: FilterItem;
  applyFilter: (filter: Option, selectionType?: "single" | "multiple") => void;
}) => {
  return (
    <SubmenuTrigger>
      <MenuItem hasSubMenu={true}>{filter.label}</MenuItem>
      <SubMenu>
        {filter.options?.map((option) => (
          <MenuItem
            key={option.label}
            onAction={() => applyFilter(option, filter.selectionType)}
          >
            {option.label}
          </MenuItem>
        ))}
      </SubMenu>
    </SubmenuTrigger>
  );
};

const FilterCalendar = ({
  filter,
  applyFilter,
}: {
  filter: FilterItem;
  applyFilter: (filter: Option, selectionType?: "single" | "multiple") => void;
}) => {
  const calendarOptions = [
    "Today",
    "Yesterday",
    "Last 7 days",
    "Last 30 days",
    "Last 12 months",
  ];
  return (
    <SubmenuTrigger>
      <MenuItem hasSubMenu={true}>{filter.label}</MenuItem>
      <SubMenu>
        {calendarOptions.map((option) => (
          <MenuItem
            key={option}
            onAction={() =>
              applyFilter(
                {
                  group: filter.label,
                  label: option,
                  value: option,
                },
                "single",
              )
            }
          >
            {option}
          </MenuItem>
        ))}
        <SubmenuTrigger>
          <MenuItem hasSubMenu={true}>Custom range</MenuItem>
          <Popover className={popoverCalendar} offset={12}>
            <Calendar
              onSelect={(date) => {
                applyFilter(
                  {
                    group: filter.label,
                    label: date?.toDateString() || "",
                    value: date?.toDateString() || "",
                  },
                  "single",
                );
              }}
            />
          </Popover>
        </SubmenuTrigger>
      </SubMenu>
    </SubmenuTrigger>
  );
};

export const Filter = ({
  filters,
  onChange,
  defaultSelected,
  isDisabled,
}: {
  filters: FilterItem[];
  onChange?: (filters: Option[]) => void;
  defaultSelected?: Option[];
  isDisabled?: boolean;
}) => {
  const [appliedFilters, setAppliedFilters] = useState<Option[]>(
    defaultSelected || [],
  );

  useEffect(() => {
    if (defaultSelected) {
      setAppliedFilters(defaultSelected);
    }
  }, [defaultSelected]);

  const applyFilter = useCallback(
    (applied: Option, selectionType: "single" | "multiple" = "multiple") => {
      const filterExists = appliedFilters.some((f) =>
        isEqualOption(f, applied),
      );
      let newFilters = appliedFilters;
      if (selectionType === "single") {
        newFilters = [
          ...appliedFilters.filter((f) => f.group !== applied.group),
          applied,
        ];
      } else {
        newFilters = filterExists
          ? appliedFilters.filter((f) => !isEqualOption(f, applied))
          : [...appliedFilters, applied];
      }
      setAppliedFilters(newFilters);
      if (onChange) {
        onChange(newFilters);
      }
    },
    [appliedFilters, onChange],
  );

  return (
    <div className={filterContainer}>
      <MenuTrigger>
        <Button className={filterButton} isDisabled={isDisabled}>
          <FunnelSimpleIcon size="1rem" />
          Filter
        </Button>
        <Menu>
          {filters.map((filter) =>
            match(filter.filterType)
              .with("select", () => (
                <FilterSelect
                  filter={filter}
                  key={filter.label}
                  applyFilter={applyFilter}
                />
              ))
              .with("calendar", () => (
                <FilterCalendar
                  filter={filter}
                  key={filter.label}
                  applyFilter={applyFilter}
                />
              ))
              .exhaustive(),
          )}
        </Menu>
      </MenuTrigger>
      {appliedFilters.length > 0 && (
        <div className={appliedFilterContainer}>
          {appliedFilters.map((filter) => (
            <div
              key={`${filter.group}-${filter.label}`}
              className={appliedFilter}
            >
              {filter.group}: {filter.label}
              <Button
                onPress={() => {
                  const newFilters = appliedFilters.filter(
                    (f) => !isEqualOption(f, filter),
                  );
                  setAppliedFilters(newFilters);
                  onChange?.(newFilters);
                }}
                className={filterDeleteButton}
              >
                <XIcon size="0.75rem" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Filter.displayName = "Filter";
