namespace LimitArrayOfType {
  type LimitArrayOfType<
    S extends number,
    T extends unknown,
    R extends T[] = [T],
    C extends T[] = []
  > = C["length"] extends S ? R : LimitArrayOfType<S, T, R | [...C, T], [...C, T]>;

  type TLAT0 = LimitArrayOfType<4, string>;
}
