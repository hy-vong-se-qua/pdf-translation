export type CustomType<T> = {
  [key: string]: T;
}

export type CallbackFunction<K, V> = (...args: K[]) => V;
