/*
  1097 - IsUnion
  -------
  by null (@bencor) #medium

  ### Question

  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

  For example:

    ```ts
    type case1 = IsUnion<string>  // false
    type case2 = IsUnion<string|number>  // true
    type case3 = IsUnion<[string|number]>  // false
    ```

  > View on GitHub: https://tsch.js.org/1097
*/

/* _____________ Your Code Here _____________ */

// By exploring the "Distributive Conditional Types" is possible to check if the tuples created, with it both enable and disabled, are equal
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
type S1<T> = [T] extends [never] ? never : [T];
type S2<T> = T extends [never] ? never : [T];
type NotEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? false : true;
type IsUnionUsingNotEqual<T> = NotEqual<S1<T>, S2<T>>;

type IsUnion<T, C extends T = T> = (T extends T ? (C extends T ? true : unknown) : never) extends true ? false : true;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<"a" | "b" | "c" | "d">, true>>,
  Expect<Equal<IsUnion<undefined | null | void | "">, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | "a">, false>>,
  Expect<Equal<IsUnion<never>, false>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1097/answer
  > View solutions: https://tsch.js.org/1097/solutions
  > More Challenges: https://tsch.js.org
*/
