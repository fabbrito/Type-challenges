/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

/* // My solution for small numbers:
type NumberToArray<N extends number, U extends number[] = []> = U["length"] extends N
  ? U
  : NumberToArray<N, [U["length"], ...U]>;
type MinusOne<N extends number> = NumberToArray<N>[0];
*/


// Lookup table to seed the counting array
// Skips to length of 10, 100, 1000 instead of counting
// Allows going up to 1998 instead of 999!
// With some work, this technique can be pushed further for higher numbers
interface InitialLengths {
    '2': [0, 0, 0, 0, 0,
        0, 0, 0, 0, 0],
    '3': [...InitialLengths[2], ...InitialLengths[2], ...InitialLengths[2], ...InitialLengths[2], ...InitialLengths[2],
         ...InitialLengths[2],...InitialLengths[2], ...InitialLengths[2], ...InitialLengths[2], ...InitialLengths[2]],
    '4': [...InitialLengths[3], ...InitialLengths[3], ...InitialLengths[3], ...InitialLengths[3], ...InitialLengths[3],
        ...InitialLengths[3], ...InitialLengths[3], ...InitialLengths[3], ...InitialLengths[3],  ...InitialLengths[3]],
}

// Accepts an array T, returns an array without the first element
type PopArray<T extends any[]> = T extends [infer First, ...infer Rest] ? [...Rest] : [];


// Convert string to array of characters
type StringToArray<S extends string> = S extends `${infer A}${infer B}`
  ? [A, ...StringToArray<B>]
  : []
// Returns the number of digits in a number
type LengthOfNumber<T extends number> = StringToArray<`${T}`>['length'];


// Accepts a number T, and returns the number T-minus-one by increasing the
// size of the array by 1 until it T == U['length'],
// followed by applying PopArray<U>
type MinusOne<T extends number, U extends any[] = []> =
  // Is T == U['length']
  T extends U['length'] ?
    // If yes, then remove the first element and return the length
    PopArray<U>['length'] :
  // (This is an optimization)
  // Otherwise, check the length of the number. Do they match?
  LengthOfNumber<T> extends LengthOfNumber<U['length']> ?
    // If yes, increment the size of the array by one and recurse
    MinusOne<T, [T, ...U]> :
    // Otherwise, initialize the counting array to the closest of 10 / 100 / 1000
  `${LengthOfNumber<T>}` extends infer L extends keyof InitialLengths ?
    MinusOne<T, InitialLengths[L]> :
  // Fail if higher than 9999 (It fails for other reasons anyways)
  never;


type Zero = MinusOne<1>;
type A = MinusOne<2>;
type B = MinusOne<20>;
type C = MinusOne<100>;
type D = MinusOne<502>;
type E = MinusOne<999>;
type F = MinusOne<1004>;
type G = MinusOne<1026>;
type H = MinusOne<1006>;
type I = MinusOne<1998>; // Works up to 1998!


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
