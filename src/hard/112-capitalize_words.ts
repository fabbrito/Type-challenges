/*
  112 - Capitalize Words
  -------
  by Anthony Fu (@antfu) #hard #template-literal

  ### Question

  Implement `CapitalizeWords<T>` which converts the first letter of **each word of a string** to uppercase and leaves the rest as-is.

  For example

  ```ts
  type capitalized = CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'
  ```

  > View on GitHub: https://tsch.js.org/112
*/

/* _____________ Your Code Here _____________ */

type CapitalizeWords<S extends string, AuxStr extends string = ""> = S extends `${infer Char}${infer Rest}`
  ? Char extends Capitalize<Char>
    ? // Char is already capitalized or not a letter
      Char extends Uncapitalize<Char>
      ? // Char is not a letter => Capitalize the string before Char (AuxStr) and verify the Rest
        `${Capitalize<AuxStr>}${Char}${CapitalizeWords<Rest>}`
      : // Char is a capitalized letter => Add it to AuxStr and verify the Rest
        CapitalizeWords<Rest, `${AuxStr}${Char}`>
    : // Char is a uncapitalized letter => Add it to AuxStr and verify the Rest
      CapitalizeWords<Rest, `${AuxStr}${Char}`>
  : Capitalize<AuxStr>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<CapitalizeWords<"foobar">, "Foobar">>,
  Expect<Equal<CapitalizeWords<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<CapitalizeWords<"foo bar">, "Foo Bar">>,
  Expect<Equal<CapitalizeWords<"foO bAr">, "FoO BAr">>,
  Expect<Equal<CapitalizeWords<"foo bar hello world">, "Foo Bar Hello World">>,
  Expect<Equal<CapitalizeWords<"foo bar.hello,world">, "Foo Bar.Hello,World">>,
  Expect<
    Equal<
      CapitalizeWords<"aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq">,
      "Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq"
    >
  >,
  Expect<Equal<CapitalizeWords<"">, "">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/112/answer
  > View solutions: https://tsch.js.org/112/solutions
  > More Challenges: https://tsch.js.org
*/
