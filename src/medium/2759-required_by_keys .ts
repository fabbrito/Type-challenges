/*
  2759 - RequiredByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement a generic `RequiredByKeys<T,  K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to be required. When `K` is not provided, it should make all properties required just like the normal `Required<T>`.

  For example

  ```typescript
  interface User {
    name?: string
    age?: number
    address?: string
  }

  type UserRequiredName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }

  ```

  > View on GitHub: https://tsch.js.org/2759
*/

/* _____________ Your Code Here _____________ */

type RequiredByKeys<T, U = keyof T> = Omit<
  Omit<T, keyof T & U> & { [K in keyof T & U]-?: [T[K]] extends [undefined] ? undefined : Exclude<T[K], undefined> },
  never
>;
type RequiredByKeysWithInfer<T, U = keyof T> = Omit<
  Omit<T, keyof T & U> & { [K in keyof T & U]: [T[K]] extends [infer IT | undefined] ? IT : T[K] },
  never
>;
type RequiredByKeysBuiltIn<T, U = keyof T> = Omit<T & Required<Pick<T, U & keyof T>>, never>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface User {
  name?: string;
  age?: number;
  address?: string;
}

interface UserRequiredName {
  name: string;
  age?: number;
  address?: string;
}

interface UserRequiredNameAndAge {
  name: string;
  age: number;
  address?: string;
}

type cases = [
  Expect<Equal<RequiredByKeys<User, "name">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, "name" | "unknown">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, "name" | "age">, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  Expect<Equal<RequiredByKeysWithInfer<User, "name">, UserRequiredName>>,
  Expect<Equal<RequiredByKeysWithInfer<User, "name" | "unknown">, UserRequiredName>>,
  Expect<Equal<RequiredByKeysWithInfer<User, "name" | "age">, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeysWithInfer<User>, Required<User>>>,
  Expect<Equal<RequiredByKeysBuiltIn<User, "name">, UserRequiredName>>,
  Expect<Equal<RequiredByKeysBuiltIn<User, "name" | "unknown">, UserRequiredName>>,
  Expect<Equal<RequiredByKeysBuiltIn<User, "name" | "age">, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeysBuiltIn<User>, Required<User>>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2759/answer
  > View solutions: https://tsch.js.org/2759/solutions
  > More Challenges: https://tsch.js.org
*/
