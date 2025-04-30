export function compareAsc(dateA: Date, dateB: Date): number {
  return dateA.getTime() - dateB.getTime()
}
