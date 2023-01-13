/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// =============================================================================
// Part 1: Simple examples
// =============================================================================

// Learning goal: See what a "pipeable" API is and how it's useful

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

// Learning goal: get our hands dirty with the `pipe` implementation so we
// understand how it works.

// I AM TOO BRITTLE AND WEIRD! <= (Don't say on a first date)

export function pipe(
  a: number,
  ab: (a: number) => number,
  bc: (b: number) => number,
): number;
export function pipe(
  a: number,
  ab: (a: number) => number,
  bc: (b: number) => number,
  cd: (c: number) => number,
  de: (d: number) => number,
  ef: (e: number) => number,
): number;
export function pipe(
  a: number,
  ab: Function,
  bc: Function,
  cd?: Function,
  de?: Function,
  ef?: Function,
): number {
  if (typeof ef === "function") {
    return ef(de!(cd!(bc(ab(a)))));
  } else {
    return bc(ab(a));
  }
}

// =============================================================================
// Part 3: Let's reimplement `map` and `chain`
// =============================================================================

// Learning goal: Understand why currying and `pipe` play well together.

// export const map: //
// export const chain: //
