/*
  651 - Length of String 2
  -------
  by null (@uid11) #hard #template-literal

  ### Question

  Implement a type `LengthOfString<S>` that calculates the length of the template string (as in [298 - Length of String](https://tsch.js.org/298)):

  ```ts
  type T0 = LengthOfString<"foo"> // 3
  ```

  The type must support strings several hundred characters long (the usual recursive calculation of the string length is limited by the depth of recursive function calls in TS, that is, it supports strings up to about 45 characters long).

  > View on GitHub: https://tsch.js.org/651
*/

/* _____________ Your Code Here _____________ */

// Solution makes use of Tail-Recursion Elimination on Conditional Types
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types
type LengthOfString<S extends string, A extends 0[] = []> = 0 extends 1
  ? never
  : S extends `${infer _}${infer R}`
  ? LengthOfString<R, [...A, 0]>
  : A["length"];

/* _____________ Test Cases _____________ */
import type { Equal, IsTrue } from "@type-challenges/utils";

type cases = [
  IsTrue<Equal<LengthOfString<"">, 0>>,
  IsTrue<Equal<LengthOfString<"1">, 1>>,
  IsTrue<Equal<LengthOfString<"12">, 2>>,
  IsTrue<Equal<LengthOfString<"123">, 3>>,
  IsTrue<Equal<LengthOfString<"1234">, 4>>,
  IsTrue<Equal<LengthOfString<"12345">, 5>>,
  IsTrue<Equal<LengthOfString<"123456">, 6>>,
  IsTrue<Equal<LengthOfString<"1234567">, 7>>,
  IsTrue<Equal<LengthOfString<"12345678">, 8>>,
  IsTrue<Equal<LengthOfString<"123456789">, 9>>,
  IsTrue<Equal<LengthOfString<"1234567890">, 10>>,
  IsTrue<Equal<LengthOfString<"12345678901">, 11>>,
  IsTrue<Equal<LengthOfString<"123456789012">, 12>>,
  IsTrue<Equal<LengthOfString<"1234567890123">, 13>>,
  IsTrue<Equal<LengthOfString<"12345678901234">, 14>>,
  IsTrue<Equal<LengthOfString<"123456789012345">, 15>>,
  IsTrue<Equal<LengthOfString<"1234567890123456">, 16>>,
  IsTrue<Equal<LengthOfString<"12345678901234567">, 17>>,
  IsTrue<Equal<LengthOfString<"123456789012345678">, 18>>,
  IsTrue<Equal<LengthOfString<"1234567890123456789">, 19>>,
  IsTrue<Equal<LengthOfString<"12345678901234567890">, 20>>,
  IsTrue<Equal<LengthOfString<"123456789012345678901">, 21>>,
  IsTrue<Equal<LengthOfString<"1234567890123456789012">, 22>>,
  IsTrue<Equal<LengthOfString<"12345678901234567890123">, 23>>,
  IsTrue<
    Equal<
      LengthOfString<"aaaaaaaaaaaaggggggggggggggggggggkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa">,
      272
    >
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/651/answer
  > View solutions: https://tsch.js.org/651/solutions
  > More Challenges: https://tsch.js.org
*/
