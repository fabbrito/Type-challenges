/*
  216 - Slice
  -------
  by Anthony Fu (@antfu) #extreme #array

  ### Question

  Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes the three argument.
  The output should be a subarray of `Arr` from index `Start` to `End`. Indexes with negative numbers should be counted from reversely.

  For example

  ```ts
  type Arr = [1, 2, 3, 4, 5]
  type Result = Slice<Arr, 2, 4> // expected to be [3, 4]
  ```

  > View on GitHub: https://tsch.js.org/216
*/

/* _____________ Your Code Here _____________ */

//* My solution
/* // Slice logic for positive Start and Stop
type SliceLogic<
  T extends any[],
  Start extends string | number = 0,
  Stop extends string | number = T["length"],
  Result extends any[] = [],
  Count extends 0[] = [],
  Flag extends boolean = `${Count["length"]}` extends `${Start}` ? true : false
> = `${Count["length"]}` extends `${Stop}`
  ? Result
  : T extends [infer First, ...infer Rest]
  ? Flag extends true
    ? SliceLogic<Rest, Start, Stop, [...Result, First], [...Count, 0], Flag>
    : SliceLogic<Rest, Start, Stop, Result, [...Count, 0]>
  : [];

type Reverse<T extends any[]> = T extends [infer F, ...infer R] ? [...Reverse<R>, F] : T;

type Slice<
  T extends any[],
  Start extends number = 0,
  Stop extends number = T["length"]
> = `${Start}` extends `-${infer AbsStart}`
  ? `${Stop}` extends `-${infer AbsStop}`
    ? // Both are negative numbers
      Reverse<SliceLogic<Reverse<T>, AbsStop, AbsStart>>
    : // Start is negative and Stop is positive
      Reverse<SliceLogic<Reverse<SliceLogic<T, 0, Stop>>, 0, AbsStart>>
  : `${Stop}` extends `-${infer AbsStop}`
  ? // Start is positive and Stop is negative
    Reverse<SliceLogic<Reverse<SliceLogic<T, Start>>, AbsStop>>
  : // Both are positive numbers
    SliceLogic<T, Start, Stop>;
*/

//* From https://github.com/type-challenges/type-challenges/issues/3696
type Do<A, S, E, N extends 1[] = [], R extends unknown[] = []> = N["length"] extends E
  ? R
  : A extends [infer H, ...infer T]
  ? Do<T, S, E, [...N, 1], N["length"] extends S ? [H] : R extends [] ? [] : [...R, H]>
  : R;

type Normalize<A extends unknown[], I extends number, N extends 1[] = []> = `${I}` extends `${N["length"]}`
  ? N["length"]
  : `${I}` extends `-${N["length"]}`
  ? A["length"]
  : A extends [unknown, ...infer T]
  ? Normalize<T, I, [...N, 1]>
  : `${I}` extends `-${string}`
  ? 0
  : N["length"];

type Slice<A extends unknown[], S extends number = 0, E extends number = A["length"]> = Do<
  A,
  Normalize<A, S>,
  Normalize<A, E>
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Arr = [1, 2, 3, 4, 5];

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/216/answer
  > View solutions: https://tsch.js.org/216/solutions
  > More Challenges: https://tsch.js.org
*/
