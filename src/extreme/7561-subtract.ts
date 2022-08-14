/*
  7561 - Subtract
  -------
  by Lo (@LoTwT) #extreme #tuple

  ### Question

  Implement the type Subtraction that is ` - ` in Javascript by using BuildTuple.

  If the minuend is less than the subtrahend, it should be `never`.

  It's a simple version.

  For example

  ```ts
  Subtract<2, 1> // expect to be 1
  Subtract<1, 2> // expect to be never
  ```

  > View on GitHub: https://tsch.js.org/7561
*/

/* _____________ Your Code Here _____________ */

// M => minuend, S => subtrahend
type Subtract<
  M extends number,
  S extends number,
  Count extends 0[] = [],
  Result extends 0[] = [],
  Flag extends boolean = Count["length"] extends S ? true : false
> = Count["length"] extends M
  ? Flag extends true
    ? Result["length"]
    : never
  : Flag extends true
  ? Subtract<M, S, [...Count, 0], [...Result, 0], Flag>
  : Subtract<M, S, [...Count, 0], Result>;

//* From https://github.com/type-challenges/type-challenges/issues/11216
// Solution uses https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types
type Tuple<T, A extends 1[] = []> = 0 extends 1 ? never : A["length"] extends T ? A : Tuple<T, [...A, 1]>;

type SubtractREOCT<M extends number, S extends number> = Tuple<M> extends [...Tuple<S>, ...infer R]
  ? R["length"]
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>,
  Expect<Equal<SubtractREOCT<1, 1>, 0>>,
  Expect<Equal<SubtractREOCT<2, 1>, 1>>,
  Expect<Equal<SubtractREOCT<1, 2>, never>>,
  Expect<Equal<SubtractREOCT<1000, 999>, 1>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/7561/answer
  > View solutions: https://tsch.js.org/7561/solutions
  > More Challenges: https://tsch.js.org
*/
