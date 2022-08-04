/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Get an `Object` that is the difference between `O` & `O1`

  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

/* type Diff<F, S> = {
  [K in Exclude<keyof F, keyof S> | Exclude<keyof S, keyof F>]: K extends Exclude<keyof F, keyof S>
    ? F[K]
    : K extends Exclude<keyof S, keyof F>
    ? S[K]
    : never;
}; */

// From https://github.com/type-challenges/type-challenges/issues/3014
//Omit the keys of the intersection from the union of the objects
// First & Second => union
// First | Second => intersection
type Diff<First, Second> = Omit<First & Second, keyof (First | Second)>;


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
