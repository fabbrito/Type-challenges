/*
  151 - Query String Parser
  -------
  by Pig Fang (@g-plane) #extreme #template-literal

  ### Question

  You're required to implement a type-level parser to parse URL query string into a object literal type.

  Some detailed requirements:

  - Value of a key in query string can be ignored but still be parsed to `true`. For example, `'key'` is without value, so the parser result is `{ key: true }`.
  - Duplicated keys must be merged into one. If there are different values with the same key, values must be merged into a tuple type.
  - When a key has only one value, that value can't be wrapped into a tuple type.
  - If values with the same key appear more than once, it must be treated as once. For example, `key=value&key=value` must be treated as `key=value` only.

  > View on GitHub: https://tsch.js.org/151
*/

/* _____________ Your Code Here _____________ */

// MergeAndAppend<O, M, Flag>: Merges the M into O.
// If a key K matches for both objects, the value of M[K] gets appended to O[K]
// Overwrites only occur when Flag=true. In this case, it defaults to value=true
// Samples: type M0 = MergeAndAppend<{ a: 0 }, { a: 1; b: 2 }>; // { a: [0, 1]; b: 2 }
//          type M1 = MergeAndAppend<{ a: 0 }, { b: any }, true>; // { a: 0; b: true }
type MergeAndAppend<O extends object, M extends object, Flag extends boolean = false> = {
  [K in keyof O | keyof M]: K extends keyof O
    ? K extends keyof M
      ? Flag extends true
        ? true
        : M[K] extends O[K]
        ? O[K]
        : [O[K], ...(M[K] extends any[] ? M[K] : [M[K]])]
      : O[K]
    : K extends keyof M
    ? Flag extends true
      ? true
      : M[K]
    : never;
};

// HandleKeyValuePair<S, O>: Merges/Appends to O an object with Key-Value painr inferred from S
// Samples: type H0 = HandleKeyValuePair<"k1=v1", {}>; // { k1: "v1" }
//          type H1 = HandleKeyValuePair<"k2", H0>; // { k1: "v1"; k2: true }
type HandleKeyValuePair<S extends string, O extends object> = S extends `${infer Key}=${infer Value}`
  ? MergeAndAppend<O, Record<Key, Value>>
  : MergeAndAppend<O, Record<S, never>, true>;

// ParseQueryString<S>: Returns an object constructed with all, if any, "key=value" pairs inferred from S
type ParseQueryString<S extends string, Result extends object = {}> = S extends ""
  ? Result
  : S extends `${infer First}&${infer Others}`
  ? ParseQueryString<Others, HandleKeyValuePair<First, Result>>
  : HandleKeyValuePair<S, Result>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ParseQueryString<"">, {}>>,
  Expect<Equal<ParseQueryString<"k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k2">, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2">, { k1: ["v1", "v2"] }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2">, { k1: "v1"; k2: "v2" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2">, { k1: ["v1", "v2"]; k2: "v2" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2">, { k1: "v1"; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v1">, { k1: "v1" }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/151/answer
  > View solutions: https://tsch.js.org/151/solutions
  > More Challenges: https://tsch.js.org
*/
