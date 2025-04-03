/**
 * Compare two dates in descending order.
 * @param dateA - The first date.
 * @param dateB - The second date.
 * @returns A number indicating the comparison result.
 */
export function compareDesc(dateA: Date, dateB: Date): number {
  return dateB.getTime() - dateA.getTime()
}
