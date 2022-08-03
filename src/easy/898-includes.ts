/*
  898 - Includes
  -------
  by null (@kynefuk) #easy #array

  ### Question

  Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.

  For example:

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > View on GitHub: https://tsch.js.org/898
*/

/* _____________ Your Code Here _____________ */

// Recursive solution
type RecursiveIncludes<T extends readonly any[], U> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? true
    : RecursiveIncludes<R, U>
  : false;

// Iterative solution
type IterativeIncludes<T extends readonly any[], U> = { [K in keyof T]: Equal<T[K], U> }[number] extends false
  ? false
  : true;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type RecursiveCases = [
  Expect<Equal<RecursiveIncludes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>>,
  Expect<Equal<RecursiveIncludes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>>,
  Expect<Equal<RecursiveIncludes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<RecursiveIncludes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<RecursiveIncludes<[1, 2, 3], 2>, true>>,
  Expect<Equal<RecursiveIncludes<[1, 2, 3], 1>, true>>,
  Expect<Equal<RecursiveIncludes<[{}], { a: "A" }>, false>>,
  Expect<Equal<RecursiveIncludes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<RecursiveIncludes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<RecursiveIncludes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<RecursiveIncludes<[{ a: "A" }], { readonly a: "A" }>, false>>,
  Expect<Equal<RecursiveIncludes<[{ readonly a: "A" }], { a: "A" }>, false>>,
  Expect<Equal<RecursiveIncludes<[1], 1 | 2>, false>>,
  Expect<Equal<RecursiveIncludes<[1 | 2], 1>, false>>,
  Expect<Equal<RecursiveIncludes<[null], undefined>, false>>,
  Expect<Equal<RecursiveIncludes<[undefined], null>, false>>
];

type IterativeCases = [
  Expect<Equal<IterativeIncludes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>>,
  Expect<Equal<IterativeIncludes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>>,
  Expect<Equal<IterativeIncludes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<IterativeIncludes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<IterativeIncludes<[1, 2, 3], 2>, true>>,
  Expect<Equal<IterativeIncludes<[1, 2, 3], 1>, true>>,
  Expect<Equal<IterativeIncludes<[{}], { a: "A" }>, false>>,
  Expect<Equal<IterativeIncludes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<IterativeIncludes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<IterativeIncludes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<IterativeIncludes<[{ a: "A" }], { readonly a: "A" }>, false>>,
  Expect<Equal<IterativeIncludes<[{ readonly a: "A" }], { a: "A" }>, false>>,
  Expect<Equal<IterativeIncludes<[1], 1 | 2>, false>>,
  Expect<Equal<IterativeIncludes<[1 | 2], 1>, false>>,
  Expect<Equal<IterativeIncludes<[null], undefined>, false>>,
  Expect<Equal<IterativeIncludes<[undefined], null>, false>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/898/answer
  > View solutions: https://tsch.js.org/898/solutions
  > More Challenges: https://tsch.js.org
*/
