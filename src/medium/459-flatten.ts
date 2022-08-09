/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #medium #array

  ### Question

  In this challenge, you would need to write a type that takes an array and emitted the flatten array type.

  For example:

  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```

  > View on GitHub: https://tsch.js.org/459
*/

/* _____________ Your Code Here _____________ */

type FlattenWithAcc<T extends any[], Acc extends any[] = []> = T extends [infer Value, ...infer Tail]
  ? Value extends any[]
    ? FlattenWithAcc<[...Value, ...Tail], Acc>
    : FlattenWithAcc<Tail, [...Acc, Value]>
  : Acc;

type Flatten<T extends any | any[]> = T extends []
  ? T
  : T extends [infer V, ...infer R]
    ? [...Flatten<V>, ...Flatten<R>]
    : [T];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Flatten<[1]>, [1]>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>, [{ foo: "bar"; 2: 10 }, "foobar"]>>,
  Expect<Equal<FlattenWithAcc<[]>, []>>,
  Expect<Equal<FlattenWithAcc<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenWithAcc<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenWithAcc<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<FlattenWithAcc<[{ foo: "bar"; 2: 10 }, "foobar"]>, [{ foo: "bar"; 2: 10 }, "foobar"]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/459/answer
  > View solutions: https://tsch.js.org/459/solutions
  > More Challenges: https://tsch.js.org
*/
