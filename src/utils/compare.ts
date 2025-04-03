import { compareAsc } from "./compareAsc";
import { compareDesc } from "./compareDesc";

/**
 * A lookup table for date comparison functions.
 */
export const CompareFunctionLookup: Record<
  "asc" | "desc",
  (a: Date, b: Date) => number
> = {
  asc: compareAsc,
  desc: compareDesc,
};
