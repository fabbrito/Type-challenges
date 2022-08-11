type A = {
  x: 0;
  y: 0;
  visible: false;
  render(): void;
};

type RemoveProperties<T> = { readonly [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K] };

type Test = RemoveProperties<A>;
