/*
  476 - Sum
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.

  For example,

  ```ts
  type T0 = Sum<2, 3> // '5'
  type T1 = Sum<'13', '21'> // '34'
  type T2 = Sum<'328', 7> // '335'
  type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
  ```

  > View on GitHub: https://tsch.js.org/476
*/

/* _____________ Your Code Here _____________ */

// Sum<A, B>: computes the sum of A and B digit-wise (with carry)
// From https://github.com/type-challenges/type-challenges/issues/11816

/* utils */
export type Get<T, K> = K extends keyof T ? T[K] : never;
export type AsStr<T> = T extends string ? T : never;
export type Reverse<S> = S extends `${infer First}${infer Rest}` ? `${Reverse<Rest>}${First}` : "";
export type Head<S> = S extends `${infer First}${string}` ? First : never;
export type Tail<S> = S extends `${string}${infer Rest}` ? Rest : never;
export type Replace<S, C extends string> = S extends `${string}${infer Rest}` ? `${C}${Replace<Rest, C>}` : "";
export type Rotate<S> = `${Tail<S>}${Head<S>}`;
export type Zip<From, To> = From extends `${infer First}${infer Rest}`
  ? Record<First, Head<To>> & Zip<Rest, Tail<To>>
  : {};

/* digits */
export type Digits = "0123456789";
type Zero = Head<Digits>;
type One = Head<Tail<Digits>>;

/* helpers */

// InnerAdd: helper static object with all possible sums for 2 single digit numbers (without carry)
// Sample: type S0 = InnerAdd[2][6]; // 8
//         type S1 = InnerAdd[7][8]; // 5
type GenerateAdd<To, Current = Digits> = Current extends `${infer First}${infer Rest}`
  ? Record<First, Zip<Digits, To>> & GenerateAdd<Rotate<To>, Rest>
  : {};
type InnerAdd = GenerateAdd<Digits>;

// Add<A, B>: returns the LSD of the sum of 2 single digit numbers
// Get<T, K>: helper function to access the object InnerAdd with the strings A and B
type Add<A, B> = AsStr<Get<Get<InnerAdd, A>, B>>;

// Carry<A, B, C>: Computes the new carry for the operation A + B + C
// CarryWithZero: helper static object with all possible resulting carries for the computation of A + B + 0 (initial carry = 0)
// CarryWithOne: helper static object with all possible resulting carries for the computation of A + B + 1 (initial carry = 1)
type GenerateCarry<To, Current = Digits> = Current extends `${infer First}${infer Rest}`
  ? Record<First, Zip<Digits, To>> & GenerateCarry<`${Tail<To>}${One}`, Rest>
  : {};
type CarryWithZero = GenerateCarry<Replace<Digits, Zero>>;
type CarryWithOne = GenerateCarry<`${Tail<Replace<Digits, Zero>>}${One}`>;
type Carry<A, B, C> = C extends Zero ? AsStr<Get<Get<CarryWithZero, A>, B>> : AsStr<Get<Get<CarryWithOne, A>, B>>;

/* main */
export type Sum<A extends string | number | bigint, B extends string | number | bigint> = Reverse<
  InnerSum<Reverse<`${A}`>, Reverse<`${B}`>>
>;

// InnerSum<RA, RB>: performs a digit-wise sum, with carry, of numbers A and B.
// RA/RB: reffers to the numbers A/B in reversed string form so that the computations start from the Least Significant Digit (LSD) of each number;
// LSDA/LSDB: reffers to the least significant digit of number A/B (first for the reversed string);
type InnerSum<RA extends string, RB extends string, C extends string = Zero> = RA extends `${infer LSDA}${infer RestA}`
  ? RB extends `${infer LSDB}${infer RestB}`
    ? // Compute (LSDA + LSDB + C): the result will become the new LSD and the carry is passed for the comptutation of the next digit
      `${Add<Add<LSDA, LSDB>, C>}${InnerSum<RestA, RestB, Carry<LSDA, LSDB, C>>}`
    : InnerSum<RA, C>
  : RB extends ""
  ? C extends Zero
    ? ""
    : C
  : InnerSum<RB, C>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Sum<2, 3>, "5">>,
  Expect<Equal<Sum<"13", "21">, "34">>,
  Expect<Equal<Sum<"328", 7>, "335">>,
  Expect<Equal<Sum<1_000_000_000_000n, "123">, "1000000000123">>,
  Expect<Equal<Sum<9999, 1>, "10000">>,
  Expect<Equal<Sum<4325234, "39532">, "4364766">>,
  Expect<Equal<Sum<728, 0>, "728">>,
  Expect<Equal<Sum<"0", 213>, "213">>,
  Expect<Equal<Sum<0, "0">, "0">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/476/answer
  > View solutions: https://tsch.js.org/476/solutions
  > More Challenges: https://tsch.js.org
*/
