/*
  5153 - IndexOf
  -------
  by Pineapple (@Pineapple0919) #medium #array

  ### Question

  Implement the type version of Array.indexOf, indexOf<T, U> takes an Array T, any U and returns the index of the first U in Array T.

  ```ts
  type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
  type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
  type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
  ```

  > View on GitHub: https://tsch.js.org/5153
*/

/* _____________ Your Code Here _____________ */

type IndexOf<T extends unknown[], U extends any, A extends number[] = []> = T extends [infer F, ...infer R]
  ? (<T>() => T extends F ? 1 : 0) extends <T>() => T extends U ? 1 : 0
    ? A["length"]
    : IndexOf<R, U, [A["length"], ...A]>
  : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, "a"], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, "a", any], any>, 4>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5153/answer
  > View solutions: https://tsch.js.org/5153/solutions
  > More Challenges: https://tsch.js.org
*/
