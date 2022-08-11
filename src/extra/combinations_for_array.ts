/* _____________ Your Code Here _____________ */

type CombinationForArray<T extends any[], A extends any = T[number], U extends any = A> = U extends A
  ? [] | [U] | [U, ...CombinationForArray<[], Exclude<A, U>>]
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [Expect<Equal<CombinationForArray<[1, 2]>, [] | [1] | [2] | [1, 2] | [2, 1]>>];

/* _____________ Further Steps _____________ */
