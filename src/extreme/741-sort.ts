/*
  741 - Sort
  -------
  by Sg (@suica) #extreme #infer #array

  ### Question

  In this challenge, you are required to sort natural number arrays in either ascend order or descent order.

  Ascend order examples:
  ```ts
  Sort<[]> // []
  Sort<[1]> // [1]
  Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]> //  [2, 4, 5, 6, 6, 6, 7, 8, 9]
  ```

  The `Sort` type should also accept a boolean type. When it is `true`, the sorted result should be in descent order. Some examples:

  ```ts
  Sort<[3, 2, 1], true> // [3, 2, 1]
  Sort<[3, 2, 0, 1, 0, 0, 0], true> // [3, 2, 1, 0, 0, 0, 0]
  ```

  Extra challenges:
  1. Support natural numbers with 15+ digits.
  2. Support float numbers.

  > View on GitHub: https://tsch.js.org/741
*/

/* _____________ Your Code Here _____________ */

// Comparator<A, B>:
// Takes A and B input numbers and returns one of: (A > B) Comparison.Greater , (A = B) Comparison.Equal or (A < B) Comparison.Lower
// Answer for the "274 - Integers Comparator" challenge (https://github.com/type-challenges/type-challenges/issues/11444)
enum Comparison {
  Greater,
  Equal,
  Lower,
}

type Comparator<
  A extends number | bigint | string,
  B extends number | bigint | string
> = `${A}` extends `-${infer AbsA}`
  ? `${B}` extends `-${infer AbsB}`
    ? ComparePositives<AbsB, AbsA>
    : Comparison.Lower
  : `${B}` extends `-${number}`
  ? Comparison.Greater
  : ComparePositives<`${A}`, `${B}`>;

type ComparePositives<
  A extends string,
  B extends string,
  ByLength = CompareByLength<A, B>
> = ByLength extends Comparison.Equal ? CompareByDigits<A, B> : ByLength;

type CompareByLength<A extends string, B extends string> = A extends `${infer AF}${infer AR}`
  ? B extends `${infer BF}${infer BR}`
    ? CompareByLength<AR, BR>
    : Comparison.Greater
  : B extends `${infer BF}${infer BR}`
  ? Comparison.Lower
  : Comparison.Equal;

type CompareByDigits<
  A extends string,
  B extends string
> = `${A}|${B}` extends `${infer AF}${infer AR}|${infer BF}${infer BR}`
  ? CompareDigits<AF, BF> extends Comparison.Equal
    ? CompareByDigits<AR, BR>
    : CompareDigits<AF, BF>
  : Comparison.Equal;

type CompareDigits<A extends string, B extends string> = A extends B
  ? Comparison.Equal
  : "0123456789" extends `${string}${A}${string}${B}${string}`
  ? Comparison.Lower
  : Comparison.Greater;

type Reverse<T extends any[]> = T extends [infer F, ...infer R] ? [...Reverse<R>, F] : T;

/* ______________ Sorting _______________ */

type CompareAndAppend<T extends number[], N extends number, Acc extends number[] = []> = T extends [infer F, ...infer M]
  ? F extends number
    ? Comparator<N, F> extends Comparison.Lower | Comparison.Equal
      ? [...Acc, N, ...T]
      : Comparator<N, F> extends Comparison.Greater
      ? CompareAndAppend<M extends number[] ? M : [], N, [...Acc, F]>
      : never
    : never
  : [...Acc, N];

type NormalSort<T extends number[], Result extends number[] = []> = T extends [infer F, ...infer R]
  ? NormalSort<R extends number[] ? R : never, CompareAndAppend<Result, F extends number ? F : never>>
  : Result;

type Sort<T extends number[], Flag extends boolean = false> = Flag extends true
  ? Reverse<NormalSort<T>>
  : NormalSort<T>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Sort<[]>, []>>,
  Expect<Equal<Sort<[1]>, [1]>>,
  Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
  Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
  Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
  Expect<Equal<Sort<[], true>, []>>,
  Expect<Equal<Sort<[1], true>, [1]>>,
  Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
  Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/741/answer
  > View solutions: https://tsch.js.org/741/solutions
  > More Challenges: https://tsch.js.org
*/
