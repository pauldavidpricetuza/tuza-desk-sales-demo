import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import {
  buttonNav,
  chevron,
  day,
  dayButton,
  headRow,
  month,
  monthCaption,
  nav,
  outside,
  week,
  weekday,
  weekdays,
} from "./Calendar.css";

export const Calendar = ({
  onSelect,
}: {
  onSelect?: (date: Date | undefined) => void;
}) => {
  return (
    <DayPicker
      showOutsideDays={true}
      mode="single"
      onSelect={onSelect}
      classNames={{
        month: month,
        month_caption: monthCaption,
        weekdays: weekdays,
        weekday: weekday,
        head_row: headRow,
        week: week,
        day: day,
        outside: outside,
        day_button: dayButton,
        nav: nav,
        button_next: buttonNav,
        button_previous: buttonNav,
        chevron: chevron,
      }}
    />
  );
};

Calendar.displayName = "Calendar";
