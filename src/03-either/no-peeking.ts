export type Left<E> = { _tag: "Left"; left: E };
export type Right<A> = { _tag: "Right"; right: A };

export type Either<E, A> = Left<E> | Right<A>;

export const isRight = <E, A>(a: Either<E, A>): a is Right<A> =>
  a._tag === "Right";
export const isLeft = <E, A>(a: Either<E, A>): a is Left<E> =>
  a._tag === "Left";

export const right = <E = never, A = never>(right: A): Either<E, A> => ({
  _tag: "Right",
  right,
});

export const left = <E = never, A = never>(left: E): Either<E, A> => ({
  _tag: "Left",
  left,
});

export const map: <E, A, B>(
  f: (a: A) => B,
) => (a: Either<E, A>) => Either<E, B> = (f) => (a) =>
  isRight(a) ? right(f(a.right)) : a;

export const chain: <E, A, B>(
  f: (a: A) => Either<E, B>,
) => (a: Either<E, A>) => Either<E, B> = (f) => (a) =>
  isRight(a) ? f(a.right) : a;
