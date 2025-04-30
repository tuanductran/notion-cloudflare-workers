import { compareAsc } from './compareAsc'
import { compareDesc } from './compareDesc'

export const CompareFunctionLookup: Record<
  'asc' | 'desc',
  (a: Date, b: Date) => number
> = {
  asc: compareAsc,
  desc: compareDesc,
}
