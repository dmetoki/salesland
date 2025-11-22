import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number | null | undefined): string {
  if (value == null || isNaN(value)) {
    return "-";
  }

  const absValue = Math.abs(value);
  let formatted: string;

  if (absValue >= 1_000_000_000) {
    formatted = (absValue / 1_000_000_000).toFixed(1) + "B";
  } else if (absValue >= 1_000_000) {
    formatted = (absValue / 1_000_000).toFixed(1) + "M";
  } else if (absValue >= 1_000) {
    formatted = (absValue / 1_000).toFixed(1) + "k";
  } else {
    formatted = absValue.toString();
  }

  // Restore the original sign
  return value < 0 ? `-${formatted}` : formatted;
}

export function formatYYYYMMDDToDate(lang: string, input: string): string {
  if (!/^\d{8}$/.test(input)) return input;
  
  const year = parseInt(input.slice(0, 4), 10);
  const month = parseInt(input.slice(4, 6), 10) - 1;
  const day = parseInt(input.slice(6, 8), 10);
  const date = new Date(year, month, day);
  return date.toLocaleDateString(lang, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

