/*
  5181 - Mutable Keys
  -------
  by Yugang Cao (@Talljack) #hard #utils

  ### Question

  Implement the advanced util type MutableKeys<T>, which picks all the mutable (not readonly) keys into a union.

  For example:

  ```ts
  type Keys = MutableKeys<{ readonly foo: string; bar: number }>;
  // expected to be “bar”
  ```

  > View on GitHub: https://tsch.js.org/5181
*/

/* _____________ Your Code Here _____________ */

/* // *My solution
type MutableKeys<T extends object, Key = keyof T> = Key extends keyof T
  ? // Apply the logic bellow to each part of the union "keyof T" (Proof: never | A = A)
    Equal<Pick<T, Key>, Readonly<Record<Key, T[Key]>>> extends true
    ? // return never if is required and readonly
      never
    : Equal<Pick<T, Key>, Readonly<Partial<Record<Key, T[Key]>>>> extends true
    ? // return never if is optional and readonly
      never
    : Key
  : never;
 */

//* From https://github.com/type-challenges/type-challenges/issues/13127
type MutableKeys<T extends object> = keyof {
  [K in keyof T as Equal<Pick<T, K>, Readonly<Pick<T, K>>> extends true ? never : K]: any;
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, "a">>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, "a">>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>, "a" | "c" | "d">>,
  Expect<Equal<MutableKeys<{}>, never>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5181/answer
  > View solutions: https://tsch.js.org/5181/solutions
  > More Challenges: https://tsch.js.org
*/
