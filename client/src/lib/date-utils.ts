import { format, addDays, subDays, isToday, isFuture } from "date-fns";

export function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function formatDisplayDate(date: Date): string {
  if (isToday(date)) {
    return "Today";
  }
  return format(date, "EEEE, MMMM d, yyyy");
}

export function formatShortDate(date: Date): string {
  return format(date, "MMM d, yyyy");
}

export function getPreviousDay(date: Date): Date {
  return subDays(date, 1);
}

export function getNextDay(date: Date): Date {
  return addDays(date, 1);
}

export function canNavigateToFuture(date: Date): boolean {
  // Allow navigation to any date in the current year for yearly Odu readings
  const today = new Date();
  const currentYear = today.getFullYear();
  const dateYear = date.getFullYear();
  
  // Allow navigation within current year and previous years
  return dateYear <= currentYear;
}

export function parseDate(dateString: string): Date {
  return new Date(dateString);
}
