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
  return !isFuture(addDays(date, 1));
}

export function parseDate(dateString: string): Date {
  return new Date(dateString);
}
