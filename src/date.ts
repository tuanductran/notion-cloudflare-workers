/**
 * Compare two dates in ascending order.
 * @param dateA - The first date.
 * @param dateB - The second date.
 * @returns A number indicating the comparison result.
 */
function compareAsc(dateA: Date, dateB: Date): number {
  return dateA.getTime() - dateB.getTime()
}

/**
 * Compare two dates in descending order.
 * @param dateA - The first date.
 * @param dateB - The second date.
 * @returns A number indicating the comparison result.
 */
function compareDesc(dateA: Date, dateB: Date): number {
  return dateB.getTime() - dateA.getTime()
}

/**
 * Format a date string to a human-readable format.
 * @param dateString - The date string.
 * @returns A human-readable date string.
 */
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export { compareAsc, compareDesc, formatDate }
