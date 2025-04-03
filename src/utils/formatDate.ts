/**
 * Format a date string to a human-readable format.
 * @param dateString - The date string.
 * @returns A human-readable date string.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
