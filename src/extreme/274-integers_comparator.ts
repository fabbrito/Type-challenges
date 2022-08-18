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

enum Comparison {
  Greater,
  Equal,
  Lower,
}

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

// * From https://github.com/type-challenges/type-challenges/issues/11444
type Comparator<A extends number, B extends number> = `${A}` extends `-${infer AbsA}`
  ? `${B}` extends `-${infer AbsB}`
    ? ComparePositives<AbsB, AbsA>
    : Comparison.Lower
  : `${B}` extends `-${number}`
  ? Comparison.Greater
  : ComparePositives<`${A}`, `${B}`>;

type ComparePositives<
  A extends string,
  B extends string,
  ByLength = CompareByLength<A, B>
> = ByLength extends Comparison.Equal ? CompareByDigits<A, B> : ByLength;

type CompareByLength<A extends string, B extends string> = A extends `${infer AF}${infer AR}`
  ? B extends `${infer BF}${infer BR}`
    ? CompareByLength<AR, BR>
    : Comparison.Greater
  : B extends `${infer BF}${infer BR}`
  ? Comparison.Lower
  : Comparison.Equal;

type CompareByDigits<
  A extends string,
  B extends string
> = `${A}|${B}` extends `${infer AF}${infer AR}|${infer BF}${infer BR}`
  ? CompareDigits<AF, BF> extends Comparison.Equal
    ? CompareByDigits<AR, BR>
    : CompareDigits<AF, BF>
  : Comparison.Equal;

type CompareDigits<A extends string, B extends string> = A extends B
  ? Comparison.Equal
  : "0123456789" extends `${string}${A}${string}${B}${string}`
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
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/274/answer
  > View solutions: https://tsch.js.org/274/solutions
  > More Challenges: https://tsch.js.org
*/
