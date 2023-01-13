import { pipe } from "fp-ts/function";
import type { Option } from "fp-ts/lib/Option";
import { none, some } from "fp-ts/lib/Option";

import { chain, map } from "./no-peeking";

const increment: (num: number) => number = (num) => num + 1;

const inverse: (num: number) => Option<number> = (num) =>
  num === 0 ? none : some(1.0 / num);

describe(map, () => {
  it("supports a pipeable interface with `Some`", () => {
    const result = pipe(
      some(3),
      map(increment),
      map(increment),
      map(increment),
    );

    expect(result).toEqualSome(6);
  });

  it("supports a pipeable interface with `None`", () => {
    const result = pipe(
      none, //
      map(increment),
      map(increment),
      map(increment),
    );

    expect(result).toBeNone();
  });
});

describe(chain, () => {
  it("supports a pipeable interface with `Some`", () => {
    const result = pipe(
      some(3),
      chain(inverse),
      chain(inverse),
      chain(inverse),
      chain(inverse),
    );

    expect(result).toEqualSome(3);
  });

  it("supports a pipeable interface with `None`", () => {
    const result = pipe(
      none,
      chain(inverse),
      chain(inverse),
      chain(inverse),
      chain(inverse),
    );

    expect(result).toBeNone();
  });
});

describe("map and chain", () => {
  it("supports mixing and matching with `Some`", () => {
    const result = pipe(
      some(3), //
      map(increment),
      chain(inverse),
      chain(inverse),
    );

    expect(result).toEqualSome(4);
  });

  it("supports a pipeable interface with `None`", () => {
    const result = pipe(
      none, //
      map(increment),
      chain(inverse),
      chain(inverse),
    );

    expect(result).toBeNone();
  });
});
