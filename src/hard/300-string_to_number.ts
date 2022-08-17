/*
  300 - String to Number
  -------
  by Pig Fang (@g-plane) #hard #template-literal

  ### Question

  Convert a string literal to a number, which behaves like `Number.parseInt`.

  > View on GitHub: https://tsch.js.org/300
*/

/* _____________ Your Code Here _____________ */

/* // * My Solution
type ToNumber<S extends string, A extends 0[] = []> = S extends `${number}`
  ? `${A["length"]}` extends S
    ? A["length"]
    : ToNumber<S, [...A, 0]>
  : never;
*/

// * From https://github.com/type-challenges/type-challenges/issues/398
type Num = readonly 0[];

/**
 * NumToNumber<Num3> = 3, where Num3 = [0, 0, 0]
 */
type NumToNumber<N extends Num> = N["length"];

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

/**
 * MultiplyToDigit<'3', Num2> = Num6
 */
type MultiplyToDigit<D extends Digit, N extends Num> = {
  "0": [];
  "1": N;
  "2": [...N, ...N];
  "3": [...N, ...N, ...N];
  "4": [...N, ...N, ...N, ...N];
  "5": [...N, ...N, ...N, ...N, ...N];
  "6": [...N, ...N, ...N, ...N, ...N, ...N];
  "7": [...N, ...N, ...N, ...N, ...N, ...N, ...N];
  "8": [...N, ...N, ...N, ...N, ...N, ...N, ...N, ...N];
  "9": [...N, ...N, ...N, ...N, ...N, ...N, ...N, ...N, ...N];
}[D];

/**
 * Num1
 */
type One = [0];

/**
 * DigitToNum<'2'> = Num2
 */
type DigitToNum<D extends Digit> = MultiplyToDigit<D, One>;

/**
 * Sum<Num2, Num3> = Num5
 */
type Sum<N extends Num, M extends Num> = [...N, ...M];

/**
 * MultiplyTo10<Num2> = Num20
 */
type MultiplyTo10<N extends Num> = MultiplyToDigit<"2", MultiplyToDigit<"5", N>>;

/**
 * GetBase<'2'> = Num10, GetBase<'31'> = Num100
 */
type GetBase<Number extends string> = Number extends Digit
  ? MultiplyTo10<One>
  : Number extends `${infer D}${infer Rest}`
  ? MultiplyTo10<GetBase<Rest>>
  : never;

/**
 * StrToNum<'13'> = Num13
 */
type StrToNum<Str extends string> = Str extends Digit
  ? MultiplyToDigit<Str, One>
  : Str extends `${infer D}${infer Rest}`
  ? D extends Digit
    ? Sum<MultiplyToDigit<D, GetBase<Rest>>, StrToNum<Rest>>
    : never
  : never;

/**
 * ToNumber<'24'> = 24
 */
type ToNumber<S extends string> = NumToNumber<StrToNum<S>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ToNumber<"0">, 0>>,
  Expect<Equal<ToNumber<"5">, 5>>,
  Expect<Equal<ToNumber<"12">, 12>>,
  Expect<Equal<ToNumber<"27">, 27>>,
  Expect<Equal<ToNumber<"18@7_$%">, never>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/300/answer
  > View solutions: https://tsch.js.org/300/solutions
  > More Challenges: https://tsch.js.org
*/
