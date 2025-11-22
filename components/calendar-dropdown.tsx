"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useCalendar } from "@/context/calendar-context";
import SelectedDateRange from "@/components/selected-date-range";
import { CalendarDays } from "lucide-react";

const locale = "es-AR" // Native Intl locale

export default function CalendarDropdown() {
  const { selectedRange, setSelectedRange } = useCalendar()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <CalendarDays className="h-[1.2rem] w-[1.2rem]" /> <SelectedDateRange />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* captionLayout */}
        {/* modifiers */}
        {/* fromDate, toDate */}
        <Calendar
          mode="range"
          selected={selectedRange}
          onSelect={setSelectedRange}
          buttonVariant="outline"
          formatters={{
            formatCaption: (month: Date) =>
              new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(month),
            formatWeekdayName: (weekday: Date) =>
              new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(weekday),
            formatDay: (date: Date) =>
              new Intl.DateTimeFormat(locale, { day: "numeric" }).format(date)
          }}
          numberOfMonths={1}
          defaultMonth={selectedRange?.from}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}