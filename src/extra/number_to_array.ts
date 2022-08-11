// Distributive Conditional Types (https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)
namespace DistributiveConditionalTypes {
  type ToArray<Type> = Type extends any ? Type[] : never;
  type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
  type A = ToArray<0 | 1 | 2>; // 0[] | 1[] | 2[]
  type B = ToArrayNonDist<0 | 1 | 2>; // (0 | 1 | 2)[]
}

namespace SmallNumberSubtraction {
  type NumberToArray<N extends number, U extends any[] = []> = U["length"] extends N
    ? U
    : NumberToArray<N, [...U, U["length"]]>;

  type SetAminusSetB<A extends any[], B extends any[]> = A extends [infer FA, ...infer RA]
    ? FA extends B[number]
      ? [...SetAminusSetB<RA, B>]
      : [FA, ...SetAminusSetB<RA, B>]
    : A;

  type Test = SetAminusSetB<NumberToArray<5>, NumberToArray<2>>["length"];
}
