export function compareDesc(dateA: Date, dateB: Date): number {
  return dateB.getTime() - dateA.getTime()
}
