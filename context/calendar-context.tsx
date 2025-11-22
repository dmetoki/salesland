"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { DateRange } from "react-day-picker";

// define the shape of the context
interface CalendarContextType {
    selectedRange: DateRange | undefined
    setSelectedRange: (range: DateRange | undefined) => void
}

// create the context
const CalendarContext = createContext<CalendarContextType | undefined>(undefined)

const sample_default_rage = {
    from: new Date(2025, 8, 1),
    to: new Date(2025, 10, 1)
}

// provider component
export function CalendarProvider({ children }: { children: ReactNode }) {
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(sample_default_rage)
    return (
        <CalendarContext.Provider value={{ selectedRange, setSelectedRange }}>
            {children}
        </CalendarContext.Provider>
    )
}

// custom hook for convenience
export function useCalendar() {
    const context = useContext(CalendarContext)
    if (!context) { throw new Error("useCalendar must be used within a CalendarProvider") }
    return context
}