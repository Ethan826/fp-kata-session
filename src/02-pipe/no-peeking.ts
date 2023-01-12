import type { Option } from "fp-ts/Option";
import { isSome, none, some } from "fp-ts/Option";

export const map =
  <A, B>(func: (a: A) => B) =>
  (a: Option<A>): Option<B> =>
    isSome(a) ? some(func(a.value)) : none;

export const chain =
  <A, B>(func: (a: A) => Option<B>) =>
  (a: Option<A>): Option<B> =>
    isSome(a) ? func(a.value) : none;
