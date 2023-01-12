import { pipe } from "fp-ts/function";

// =============================================================================
// Part 1: Simple examples
// =============================================================================

const firstExample = pipe(
  3,
  (previous) => previous + 3,
  (previous) => previous + 10,
);

console.log("firstExample", firstExample);

// npx ts-node ./src/02-pipe/
// => firstExample 16

const increment: (num: number) => number = (num) => num + 1;

const secondExample = pipe(
  5,
  increment,
  increment,
  increment,
  increment,
  increment,
);

console.log("secondExample", secondExample);
// => secondExample 10

// =============================================================================
// Part 2: How does `pipe` work?
// =============================================================================

// function myPipe // ...

// =============================================================================
// Part 3: Let's reimplement `map` and `chain`
// =============================================================================

// export const map: //
// export const chain: //
