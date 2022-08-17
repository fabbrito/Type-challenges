/*
  14188 - Run-length encoding
  -------
  by Hen Hedymdeith (@alfaproxima) #hard

  ### Question

  Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
  Also make a decoder for that string.

  > View on GitHub: https://tsch.js.org/14188
*/

/* _____________ Your Code Here _____________ */

namespace RLE {
  export type Encode<
    S extends string,
    PrevChar extends string = "",
    Counter extends 1[] = []
  > = S extends `${infer Char}${infer Rest}`
    ? Char extends PrevChar
      ? // Char == PrevChar: while they are equal, it keeps incrementing the counter
        Encode<Rest, Char, [...Counter, 1]>
      : // Char != PrevChar: creates a string with the current counter + the previous char + result of Encode for the rest of the string
        `${Counter["length"] extends 1 | 0 ? "" : Counter["length"]}${PrevChar}${Encode<Rest, Char, [1]>}`
    : // S == "": creates a string with the current counter + the last tested char
      `${Counter["length"] extends 1 | 0 ? "" : Counter["length"]}${PrevChar}`;

  // RepeatChar<Char, N>: Creates a string that repeats Char "N" times (with N following `${number}`)
  // Sample: RepeatChar<"A", "3"> = "AAA"
  type RepeatChar<
    Char extends string,
    N extends string,
    Result extends string = "",
    Count extends 1[] = []
  > = `${Count["length"]}` extends `${N}` ? Result : RepeatChar<Char, N, `${Result}${Char}`, [...Count, 1]>;

  export type Decode<S extends string, N extends string = "1"> = S extends `${infer Char}${infer Rest}`
    ? // When Char is a number N = Char, otherwise N = default value ("1")
      // Resulting string: repeating Char "N" times + result of Decode for the Rest of the string
      Char extends `${number}`
      ? Decode<Rest, Char>
      : `${RepeatChar<Char, N>}${Decode<Rest>}`
    : "";
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<"AAABCCXXXXXXY">, "3AB2C6XY">>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<"3AB2C6XY">, "AAABCCXXXXXXY">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14188/answer
  > View solutions: https://tsch.js.org/14188/solutions
  > More Challenges: https://tsch.js.org
*/
