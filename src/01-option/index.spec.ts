import type { Option } from "./no-peeking";
import { chain, map, none, some } from "./no-peeking";

const increment: (num: number) => number = (num) => num + 1;

const invert: (num: number) => Option<number> = (num) =>
  num === 0 ? none : some(1.0 / num);

describe(map, () => {
  it("returns the result of a function called on a `Some` in a `Some`", () => {
    expect(map(increment, some(3))).toEqual(some(4));
  });

  it("returns `None` when called on a `None`", () => {
    expect(map(increment, none)).toEqual(none);
  });
});

describe(chain, () => {
  it("returns the result of a function called on a `Some` in a `Some`", () => {
    expect(chain(invert, some(2))).toEqual(some(0.5));
  });

  it("returns `None` when called on a `None`", () => {
    expect(chain(invert, none)).toEqual(none);
  });
});
