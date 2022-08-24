/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #extreme #template-literal #math

  ### Question

  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is lower than `b`, type should be `Comparison.Lower`.

  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**

  > View on GitHub: https://tsch.js.org/274
*/

/* _____________ Your Code Here _____________ */

/* // * My Solution for small numbers
// Compares A and B, both positive numbers, and returns if A is Greater, Equal or Lower when compared to B
type ComparatorPositiveNumbers<
A extends string | number,
B extends string | number,
Count extends 1[] = []
> = A extends B
? Comparison.Equal
: `${Count["length"]}` extends `${A}`
? Comparison.Lower
: `${Count["length"]}` extends `${B}`
  ? Comparison.Greater
  : ComparatorPositiveNumbers<A, B, [...Count, 1]>;

  type Comparator<A extends number, B extends number> = `${A}` extends `-${infer AbsA}`
  ? `${B}` extends `-${infer AbsB}`
  ? // A < 0 and B < 0 => Use ComparatorPositiveNumbers, but with inverted absolute values of A and B
  // Proof: |A| = |B| => Equal, |A| > |B| => A < B, |A| < |B| => A > B
  ComparatorPositiveNumbers<AbsB, AbsA>
  : // A < 0 and B >= 0 => A < B
  Comparison.Lower
  : `${B}` extends `-${number}`
  ? // A >= 0 and B < 0 => A > B
  Comparison.Greater
  : // A >= 0 and B >= 0 => Use ComparatorPositiveNumbers<A, B>
  ComparatorPositiveNumbers<A, B>;
  */

// Main "Comparator" solution from https://github.com/type-challenges/type-challenges/issues/11444
export enum Comparison {
  Greater,
  Equal,
  Lower,
}

// ClearLeftZeros<S>: Removes the zeros at left most digits of S
// Sample: type TCLZ0 = ClearLeftZeros<"0000001010">; // "1010"
type ClearLeftZeros<S extends string> = S extends `0${infer R}` ? ClearLeftZeros<R> : S;

// Comparator<A, B>: Computes if A is Greater, Equal or Lower than B
export type Comparator<
  A extends number | bigint | string,
  B extends number | bigint | string
> = `${A}` extends `-${infer AbsA}`
  ? `${B}` extends `-${infer AbsB}`
    ? // A < 0 and B < 0:
      // ... |B| < |A| => A < B
      // ... |B| = |A| => A = B
      // ... |B| > |A| => A > B
      ComparePositives<ClearLeftZeros<AbsB>, ClearLeftZeros<AbsA>>
    : // A < 0 and B >= 0 => A < B
      Comparison.Lower
  : `${B}` extends `-${number}`
  ? // A >=0 and B < 0 => A > B
    Comparison.Greater
  : // A >= 0 and B >= 0
    ComparePositives<ClearLeftZeros<`${A}`>, ClearLeftZeros<`${B}`>>;

// ComparePositives<A, B>
// Compare the two numbers by length, if one has more digits than the other, then it must be greater.
// If the length of A and B match, then compare each digit of A to each digit of B to determine which number is greater/lower.
export type ComparePositives<
  A extends string,
  B extends string,
  ByLength = CompareByLength<A, B>
> = ByLength extends Comparison.Equal ? CompareByDigits<A, B> : ByLength;

// CompareByLength<A, B>
// Starting from the left-most digit, keeps removing a digit from both numbers until this operation is no longer possible for any of the numbers.
// When the operation is no longer possible only for one of the numbers, that number is smaller (by length) and also lower (by value).
export type CompareByLength<A extends string, B extends string> = A extends `${infer AF}${infer AR}`
  ? B extends `${infer BF}${infer BR}`
    ? CompareByLength<AR, BR>
    : Comparison.Greater
  : B extends `${infer BF}${infer BR}`
  ? Comparison.Lower
  : Comparison.Equal;

// CompareByDigits<A, B>: when this is called, the numbers match in length.
// Starting from the left-most digit, compares each digit on the same position for both of the numbers.
// If the two digits are equal, continue to the next digit. Else, the result for comparison of numbers can be inferred from the result of the comparison between digits.
export type CompareByDigits<
  A extends string,
  B extends string
> = `${A}|${B}` extends `${infer AF}${infer AR}|${infer BF}${infer BR}`
  ? CompareDigits<AF, BF> extends Comparison.Equal
    ? CompareByDigits<AR, BR>
    : CompareDigits<AF, BF>
  : Comparison.Equal;

// CompareDigits<DA, DB>: Returns if DA is Greater, Equal or Lower than DB
export type CompareDigits<DA extends string, DB extends string> = DA extends DB
  ? Comparison.Equal
  : "0123456789" extends `${string}${DA}${string}${DB}${string}`
  ? Comparison.Lower
  : Comparison.Greater;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,
  Expect<Equal<Comparator<"1000", 1_000n>, Comparison.Equal>>,
  Expect<Equal<Comparator<-10, "10">, Comparison.Lower>>,
  Expect<Equal<Comparator<10, "00010">, Comparison.Equal>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/274/answer
  > View solutions: https://tsch.js.org/274/solutions
  > More Challenges: https://tsch.js.org
*/
