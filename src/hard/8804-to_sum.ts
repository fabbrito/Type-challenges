/*
  8804 - Two Sum
  -------
  by PsiloLau (@Psilocine) #hard #array #math

  ### Question

  Given an array of integers `nums` and an integer `target`, return true if two numbers such that they add up to `target`.

  > View on GitHub: https://tsch.js.org/8804
*/

/* _____________ Your Code Here _____________ */

// Sample: Tuple<4> = [1, 1, 1, 1]
type Tuple<T, A extends 1[] = []> = T extends T ? (A["length"] extends T ? A : Tuple<T, [...A, 1]>) : never;
// Sample: Sum<4, 2> = [1, 1, 1, 1, 1, 1]["length"] = 6
type Sum<N0, N1> = [...Tuple<N0>, ...Tuple<N1>]["length"];
// Sample: AllSums<[1, 2, 3]> = Sum<1, 2 | 3> | AllSums<[2, 3], 1>
//                            = (3 | 4) | Sum<2, 3> | AllSums<[3], 1 | 2>
//                            = (3 | 4) | 5 | Sum<3, 1 | 2>
//                            = (3 | 4) | 5 | (4 | 5)
//                            = 3 | 4 | 5
type AllSums<T extends unknown[], Prev = never> = T extends [infer F, ...infer R]
  ? R["length"] extends 0
    ? Sum<F, Prev>
    : Sum<F, R[number]> | AllSums<R, Prev | F>
  : never;
// Sample: TwoSum<[1, 2, 3], 4> = 4 extends (3 | 4 | 5) ? true : false = true
type TwoSum<T extends number[], N extends number> = N extends AllSums<T> ? true : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8804/answer
  > View solutions: https://tsch.js.org/8804/solutions
  > More Challenges: https://tsch.js.org
*/
