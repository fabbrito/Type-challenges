/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

// type newArr<T extends number, A extends any[] = []> = A["length"] extends T ? A : newArr<T, [...A, ""]>;
// type GreaterArr<T extends any[], U extends any[]> = U extends [...T, ...any] ? false : true;
// type GreaterThan3<T extends number, U extends number> = GreaterArr<newArr<T>, newArr<U>>;

// type ArrayOfSmallerNumbers<N extends number, U extends number[] = []> = N extends 0
//   ? never
//   : U["length"] extends N
//   ? U
//   : ArrayOfSmallerNumbers<N, [...U, U["length"]]>;
// type GreaterThan2<T extends number, U extends number> = T extends U
//   ? false
//   : T extends ArrayOfSmallerNumbers<U>[number]
//   ? false
//   : true;
// type Test2 = GreaterThan2<10, 100>;

// type GreaterThan1<T extends number, U extends number, A extends number[] = []> = T extends A[number]
//   ? false
//   : A["length"] extends T
//   ? false
//   : A["length"] extends U
//   ? true
//   : GreaterThan1<T, U, [...A, A["length"]]>;
// type Test1 = GreaterThan1<10, 100>;

type GreaterThan<T extends number, U extends number, A extends boolean[] = []> = A["length"] extends T
  ? false
  : A["length"] extends U
  ? true
  : GreaterThan<T, U, [...A, true]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
];

// type cases12 = [
//   Expect<Equal<GreaterThan1<1, 0>, true>>,
//   Expect<Equal<GreaterThan1<5, 4>, true>>,
//   Expect<Equal<GreaterThan1<4, 5>, false>>,
//   Expect<Equal<GreaterThan1<0, 0>, false>>,
//   Expect<Equal<GreaterThan1<20, 20>, false>>,
//   Expect<Equal<GreaterThan1<10, 100>, false>>,
//   Expect<Equal<GreaterThan1<111, 11>, true>>,
//   Expect<Equal<GreaterThan2<1, 0>, true>>,
//   Expect<Equal<GreaterThan2<5, 4>, true>>,
//   Expect<Equal<GreaterThan2<4, 5>, false>>,
//   Expect<Equal<GreaterThan2<0, 0>, false>>,
//   Expect<Equal<GreaterThan2<20, 20>, false>>,
//   Expect<Equal<GreaterThan2<10, 100>, false>>,
//   Expect<Equal<GreaterThan2<111, 11>, true>>
// ];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
