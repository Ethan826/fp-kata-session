import { pipe } from "fp-ts/lib/function";

import type { Either } from "./no-peeking";
import { chain, left, map, right } from "./no-peeking";

const increment: (num: number) => number = (num) => num + 1;

const inverse: (num: number) => Either<string, number> = (num) =>
  num === 0 ? left("") : right(1.0 / num);

describe(map, () => {
  it("returns a `Right` on success", () => {
    const result = pipe(
      right(3),
      map(increment),
      map(increment),
      map(increment),
    );

    expect(result).toEqualRight(6);
  });

  it("returns a `Left` on failure", () => {
    const result = pipe(
      left("Error"), //
      map(increment),
      map(increment),
      map(increment),
    );

    expect(result).toEqualLeft("Error");
  });
});

describe(chain, () => {
  it("returns a `Right` on success", () => {
    const result = pipe(
      right(3),
      chain(inverse),
      chain(inverse),
      chain(inverse),
      chain(inverse),
    );

    expect(result).toEqualRight(3);
  });

  it("returns a `Left` on failure", () => {
    const result = pipe(
      left("Error"),
      chain(inverse),
      chain(inverse),
      chain(inverse),
      chain(inverse),
    );

    expect(result).toEqualLeft("Error");
  });
});

describe("map and chain", () => {
  it("supports mixing and matching on `Right`", () => {
    const result = pipe(
      right(3), //
      map(increment),
      chain(inverse),
      chain(inverse),
    );

    expect(result).toEqualRight(4);
  });

  it("supports mixing and matching on `Left`", () => {
    const result = pipe(
      left("Error"), //
      map(increment),
      chain(inverse),
      chain(inverse),
    );

    expect(result).toEqualLeft("Error");
  });
});
