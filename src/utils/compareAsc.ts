/**
 * Compare two dates in ascending order.
 * @param dateA - The first date.
 * @param dateB - The second date.
 * @returns A number indicating the comparison result.
 */
export function compareAsc(dateA: Date, dateB: Date): number {
  return dateA.getTime() - dateB.getTime()
}
