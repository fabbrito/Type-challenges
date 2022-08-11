/*
  8987 - Subsequence
  -------
  by jiangshan (@jiangshanmeta) #medium #union

  ### Question

  Given an array of unique elements, return all possible subsequences.

  A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.

  For example:

  ```typescript
  type A = Subsequence<[1, 2]> // [] | [1] | [2] | [1, 2]
  ```

  > View on GitHub: https://tsch.js.org/8987
*/

/* _____________ Your Code Here _____________ */

// Proof for both solutions:
// type A0 = [] | [0]
// type A1 = [] | [1]
// type A = [...A0, ...A1] // [] | [0] | [1] | [0, 1]

//* My solution:
// type Subsequence<
//   T extends any[],
//   Result extends any[] = [],
//   Aux extends any[] = [],
//   Count extends any[] = []
// > = Count["length"] extends T["length"]
//   ? [...Result, ...Aux]
//   : Subsequence<T, [...Result, ...Aux], [] | [T[Count["length"]]], [...Count, 0]>;

//* From https://github.com/type-challenges/type-challenges/issues/14159
type Subsequence<T extends any[]> = T extends [infer F, ...infer R]
  ? [F, ...Subsequence<R>] | Subsequence<R>
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8987/answer
  > View solutions: https://tsch.js.org/8987/solutions
  > More Challenges: https://tsch.js.org
*/
