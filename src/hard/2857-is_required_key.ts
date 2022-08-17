/*
  2857 - IsRequiredKey
  -------
  by jiangshan (@jiangshanmeta) #hard #utils

  ### Question

  Implement a generic ```IsRequiredKey<T, K>```  that return whether ```K``` are required keys of ```T``` .

  For example

  ```typescript
  type A = IsRequiredKey<{ a: number, b?: string },'a'> // true
  type B = IsRequiredKey<{ a: number, b?: string },'b'> // false
  type C = IsRequiredKey<{ a: number, b?: string },'b' | 'a'> // false
  ```

  > View on GitHub: https://tsch.js.org/2857
*/

/* _____________ Your Code Here _____________ */
// Proof for T = { a: undefined; b?: string } and K = "a" | "b"
// type S0<T, K extends keyof T> = T[K] extends Required<T>[K] ? never : false; // S0<T, K> = ("a" | "b")never = never // Distributive doesn't work
// type S1<T, K extends keyof T> = K extends any ? S0<T, K> : never; // S1<T,K> = S0<T, "a"> = never | S0<T, "b"> = false : never | false = false

type IsRequiredKey<T, K extends keyof T> = [
  K extends any ? (T[K] extends Required<T>[K] ? never : false) : never
] extends [never]
  ? true
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "a">, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "b">, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "b" | "a">, false>>,
  Expect<Equal<IsRequiredKey<{ a: undefined; b?: string }, "b" | "a">, false>>,
  Expect<Equal<IsRequiredKey<{ a: undefined; b?: string }, "b" | "a">, false>>,
  Expect<Equal<IsRequiredKey<{ a: undefined; b?: string }, "b" | "a">, false>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2857/answer
  > View solutions: https://tsch.js.org/2857/solutions
  > More Challenges: https://tsch.js.org
*/
