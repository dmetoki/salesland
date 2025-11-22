"use client";

import { useCalendar } from "@/context/calendar-context";

export default function SelectedDateRange() {
  const { selectedRange } = useCalendar();

  const formatDate = (date: Date) => {
    const formatter = new Intl.DateTimeFormat("es-AR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Get parts separately
    const parts = formatter.formatToParts(date);
    const day = parts.find(p => p.type === "day")?.value;
    const month = parts.find(p => p.type === "month")?.value;
    const year = parts.find(p => p.type === "year")?.value;

    return `${day} ${month} ${year}`;
  };

  if (!selectedRange?.from || !selectedRange?.to) {
    return <div>No hay fechas seleccionadas</div>;
  }

  return (
    <div className="p-2 rounded-md inline-block text-xs">
      {formatDate(selectedRange.from)} → {formatDate(selectedRange.to)}
    </div>
  );
}
