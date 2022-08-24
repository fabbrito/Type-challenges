/*
  517 - Multiply
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  **This challenge continues from [476 - Sum](https://tsch.js.org/476), it is recommended that you finish that one first,
  and modify your code based on it to start this challenge.**

  Implement a type `Multiply<A, B>` that multiplies two non-negative integers and returns their product as a string.
  Numbers can be specified as string, number, or bigint.

  For example,

  ```ts
  type T0 = Multiply<2, 3> // '6'
  type T1 = Multiply<3, '5'> // '15'
  type T2 = Multiply<'4', 10> // '40'
  type T3 = Multiply<0, 16> // '0'
  type T4 = Multiply<'13', '21'> // '273'
  type T5 = Multiply<'43423', 321543n> // '13962361689'
  ```

  > View on GitHub: https://tsch.js.org/517
*/

/* _____________ Your Code Here _____________ */

/* ___________________ Sum __________________ */
// Sum<A, B>: computes a digit-wise (with carry) sum of two positive numbers A and B
// Answer for the "476 - Sum" challenge from https://github.com/type-challenges/type-challenges/issues/11816

/* utils */
type Get<T, K> = K extends keyof T ? T[K] : never;
type AsStr<T> = T extends string ? T : never;
type Reverse<S> = S extends `${infer First}${infer Rest}` ? `${Reverse<Rest>}${First}` : "";
type Head<S> = S extends `${infer First}${string}` ? First : never;
type Tail<S> = S extends `${string}${infer Rest}` ? Rest : never;
type Replace<S, C extends string> = S extends `${string}${infer Rest}` ? `${C}${Replace<Rest, C>}` : "";
type Rotate<S> = `${Tail<S>}${Head<S>}`;
type Zip<From, To> = From extends `${infer First}${infer Rest}` ? Record<First, Head<To>> & Zip<Rest, Tail<To>> : {};

/* digits */
type Digits = "0123456789";
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
type Sum<A extends string | number | bigint, B extends string | number | bigint> = Reverse<
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

/* ______________ Multiply ______________ */

// MultiplyBySingleDigit<A, D>: performs the series of sums of the expanded computation for a multiplation of A and a single digit D;
// MultiplyBySingleDigit can also calculate the multiplication of 2 multiple digit numbers, but it is extremely inefficient;
// Proof: A * D = (A + A + ...(D-3) times... + A)
type MultiplyBySingleDigit<
  A extends string,
  D extends string,
  Acc extends string = "0",
  Count extends string = "0"
> = D extends "0" ? 0 : Count extends D ? Acc : MultiplyBySingleDigit<A, D, Sum<Acc, A>, Sum<Count, "1">>;

// InnerMultiply<A, RB>
// The multiplication operation can be optimized by separating the one of the numbers using a finite series of sums
// Proof:     B = b_0 * 10**0 + b_1 * 10**1 + ... + b_n * 10**n, n: order of magnitude of B (Base 10)
//        A * B = A * (b_0 * 10**0 + b_1 * 10**1 + ... + b_n * 10**n), n: order of magnitude of B
//        A * B = A * 10**0 * b_0 + A * 10**1 * b_1 + ... + A * 10**n * b_n
//        A * B = (A * 10**0 + ...(b_0-2) times... + A * 10**0) + ... + (A * 10**n + ...(b_n-2) times... + A * 10**n)
//        A * B = (A << 0 + ...(b_0-2) times... + A << 0) + ... + (A << n + ...(b_n-2) times... + A << n)
// In base 10, a digit-wise left shift operation is the same as a multiplication by 10: 123 * 10 = 1230 = 123 << 1 (base 10)
// RB: reversed string of number B, so that the operations start by the Least Significant Digit (LSD) of B
// OM: reffers to the order of magnitude of LSD for the current number in RB
type InnerMultiply<
  A extends string,
  RB extends string,
  Acc extends string = "0",
  OM extends string = ""
> = RB extends `${infer LSDB}${infer RestB}`
  ? InnerMultiply<A, RestB, Sum<Acc, MultiplyBySingleDigit<`${A}${OM}`, LSDB>>, `${OM}0`>
  : Acc;

// Multiply<A, B>: Computes the multiplication of A and B, with A and B integers;
// If either A = 0 or B = 0, return zero;
// Since Multiply<A, B> depends on Sum<A, B>, the arguments must be positive numbers, so the calculation of |A| and |B| are required;
// Optimization: find which number is smaller, at least in order of magnitude, and use that in the separation logic to reduce the number of computations;
type Multiply<A extends string | number | bigint, B extends string | number | bigint> = "0" extends `${A}` | `${B}`
  ? "0"
  : `${A}` extends `-${infer AbsA}`
  ? `${B}` extends `-${infer AbsB}`
    ? InnerMultiply<`${AbsA}`, Reverse<`${AbsB}`>> // A < 0 and B < 0
    : `-${InnerMultiply<`${AbsA}`, Reverse<`${B}`>>}` // A < 0 and B >= 0
  : `${B}` extends `-${infer AbsB}`
  ? `-${InnerMultiply<`${A}`, Reverse<`${AbsB}`>>}` // A >= 0 and B < 0
  : InnerMultiply<`${A}`, Reverse<`${B}`>>; // A >= 0 and B >= 0

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Multiply<2, 3>, "6">>,
  Expect<Equal<Multiply<3, "5">, "15">>,
  Expect<Equal<Multiply<"4", 10>, "40">>,
  Expect<Equal<Multiply<0, 16>, "0">>,
  Expect<Equal<Multiply<"13", "21">, "273">>,
  Expect<Equal<Multiply<"43423", 321543n>, "13962361689">>,
  Expect<Equal<Multiply<9999, 1>, "9999">>,
  Expect<Equal<Multiply<4325234, "39532">, "170985150488">>,
  Expect<Equal<Multiply<100_000n, "1">, "100000">>,
  Expect<Equal<Multiply<259, 9125385>, "2363474715">>,
  Expect<Equal<Multiply<9, 99>, "891">>,
  Expect<Equal<Multiply<315, "100">, "31500">>,
  Expect<Equal<Multiply<11n, 13n>, "143">>,
  Expect<Equal<Multiply<728, 0>, "0">>,
  Expect<Equal<Multiply<"0", 213>, "0">>,
  Expect<Equal<Multiply<0, "0">, "0">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/517/answer
  > View solutions: https://tsch.js.org/517/solutions
  > More Challenges: https://tsch.js.org
*/
