type FillToLength<T extends any[], L extends number | string, R extends any[] = []> = `${R["length"]}` extends `${L}`
  ? R
  : FillToLength<T, L, [...R, T[R["length"]]]>;
type A1 = FillToLength<[0, 1, 2], 2>;
type A2 = FillToLength<[0, 1, 2], 5>;

type SizeOfRemoved<T extends any[], A extends any[]> = T extends [...A, ...infer R] | [...infer R, ...A]
  ? R["length"]
  : never;
type B1 = SizeOfRemoved<[0, 1, 2, 3, 4, 5], [4, 5]>;
type B2 = SizeOfRemoved<[0, 1, 2, 3, 4, 5], [0, 1, 2, 3]>;
