/*
  ???? - Subtract 2
  -------

  ```ts
  Subtract<2, 1> // expect to be "1"
  Subtract<1, 2> // expect to be "-1"
  Subtract<100, 123> // expect to be "-23"
  ```
*/

/* _____________ Your Code Here _____________ */

/* ___________________ Sum __________________ */
// Sum<A, B>: computes a digit-wise (with carry) sum of two positive numbers A and B
import type { Sum, Get, Tail } from "../extreme/476-sum";

/* _________________ Compare ________________ */
// Comparator<A, B>: Computes if A is Greater, Equal or Lower than B, using the enum Comparison
import type { Comparison, Comparator } from "../extreme/274-integers_comparator";

/* ______________ Subtract ______________ */

// ClearLeftZeroPadding<S>: Removes the zeros at left most digits of S
// Sample: type TCLZ0 = ClearLeftZeroPadding<"0000001010">; // "1010"
type ClearLeftZeroPadding<S extends string> = S extends `0${infer R}` ? ClearLeftZeroPadding<R> : S;

// LeftZeroPadding<A, B>: By padding to the left with zeros, it extends the length of B to matches the length of A;
// Sample: type TZP0 = LeftZeroPadding<"1234", "12">; // "0012"
type LeftZeroPadding<A extends string, B extends string, Res extends string = ""> = A extends `${infer BF}${infer BR}`
  ? B extends `${infer AF}${infer AR}`
    ? LeftZeroPadding<BR, AR, `${Res}${AF}`>
    : LeftZeroPadding<BR, "", `0${Res}`>
  : `${Res}${B}`;

// TensComplement<A, B>: Computes the ten's complement of B in relation to the length of A;
// Logic: TCB, the Ten's Complement of the number B, represents the value that when added to B equals a multiple of 10, 100, 1000...
//        The TCB is computed with ZPB, the left-zero-padded of the input number B, so that the resulting length matches the length of A;
//        Additionally, TCB is computed digit-wise using the ComplementMap object (simple substitution), then the value 1 is added to the result;
// ZPB: B zero-padded to match the length of A;
// Sample: type TTC0 = TensComplement<"1234", "12">; // "9988"
type ComplementMap = {
  "0": "9";
  "1": "8";
  "2": "7";
  "3": "6";
  "4": "5";
  "5": "4";
  "6": "3";
  "7": "2";
  "8": "1";
  "9": "0";
};
type TensComplement<
  A extends string,
  B extends string,
  ZPB = LeftZeroPadding<A, B>,
  Result extends string = ""
> = ZPB extends `${infer LeftDigit}${infer OtherDigits}`
  ? TensComplement<A, B, OtherDigits, `${Result}${Get<ComplementMap, LeftDigit>}`>
  : Sum<Result, "1">;

// InnerSubtract<A, B>: Computes the subtraction of two positive, non-zero, numbers A and B;
// Logic: Computes the Ten's complement of the smaller number. After that, it adds it to other (bigger) number, the result, after cropping the higher order carry,
//        is the resulting subtraction of Bigger-Smaller. Lastly, if B was the bigger number, a negative sign is added to the result.
// Sample: type TIS = InnerSubtract<"1234", "12">; // "1222"
type InnerSubtract<
  A extends string,
  B extends string,
  CompareAB = Comparator<A, B>
> = CompareAB extends Comparison.Equal // A = B => A - B = 0
  ? "0"
  : CompareAB extends Comparison.Greater // A > B => (A - B) > 0
  ? ClearLeftZeroPadding<Tail<Sum<A, TensComplement<A, B>>>>
  : CompareAB extends Comparison.Lower // A < B => (A - B) < 0
  ? `-${ClearLeftZeroPadding<Tail<Sum<B, TensComplement<B, A>>>>}`
  : never;

// Subtract<A, B>: Computes the operation A - B
// To avoid unecessary computations, it is checked if the numbers are equal or if any of then is zero;
type Subtract<A extends string | number | bigint, B extends string | number | bigint> = `${A}` extends `${B}`
  ? "0" // A = B => A - B = 0
  : `${B}` extends "0"
  ? `${A}` // B = 0 => A - B = A
  : `${B}` extends `-${infer AbsB}`
  ? // B < 0
    `${A}` extends "0"
    ? // B < 0 and A = 0
      `${AbsB}` // B < 0 and A = 0 => A - B = |B|
    : // B < 0 and A != 0
    `${A}` extends `-${infer AbsA}`
    ? // B < 0 and A < 0
      InnerSubtract<AbsB, AbsA> // B < 0 and A < 0 => A - B = |B| - |A|
    : // B < 0 and A > 0
      Sum<A, AbsB> // B < 0 and A > 0 =>  A - B = |A| + |B|
  : // B > 0
  `${A}` extends "0"
  ? // B > 0 and A = 0
    `-${B}` // B > 0 and A = 0 => A - B = - |B|
  : // B > 0 and A != 0
  `${A}` extends `-${infer AbsA}`
  ? // B > 0 and A < 0
    `-${Sum<AbsA, B>}` // B > 0 and A < 0 => A - B = - (|A| + |B|)
  : // B > 0 and A > 0
    InnerSubtract<`${A}`, `${B}`>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Subtract<0, 0>, "0">>,
  Expect<Equal<Subtract<1, 0>, "1">>,
  Expect<Equal<Subtract<0, 1>, "-1">>,
  Expect<Equal<Subtract<1, 1>, "0">>,
  Expect<Equal<Subtract<1, -1>, "2">>,
  Expect<Equal<Subtract<-1, 1>, "-2">>,
  Expect<Equal<Subtract<2, 1>, "1">>,
  Expect<Equal<Subtract<1, 2>, "-1">>,
  Expect<Equal<Subtract<-2, -1>, "-1">>,
  Expect<Equal<Subtract<-1, -2>, "1">>,
  Expect<Equal<Subtract<1000, 999>, "1">>,
  Expect<Equal<Subtract<999, 1000>, "-1">>,
  Expect<Equal<Subtract<123_456n, 12_345n>, "111111">>,
  Expect<Equal<Subtract<12_345n, 123_456n>, "-111111">>
];

/* _____________ Further Steps _____________ */
