// =============================================================================
// Part 1: Errors aren't part of the types
// =============================================================================

class CompletelyUnexpectedError extends Error {}

const innocentAddition: (a: number, b: number) => number = (a, b) => {
  if (new Date().getSeconds() % 2 === 0) {
    throw new CompletelyUnexpectedError("Surprise sucker");
  }

  return a + b;
};

console.log("innocentAddition", innocentAddition(3, 7));

// npx ts-node ./src/03-either/
// => innocentAddition 10
// ... maybe

// =============================================================================
// Part 2: Errors are go to (considered harmful)
// =============================================================================

class ErrorA extends Error {}
class ErrorB extends Error {}
class ErrorC extends Error {}

const chaos = () => {
  [
    () => {
      throw new ErrorA();
    },
    () => {
      throw new ErrorB();
    },
    () => {
      throw new ErrorC();
    },
  ][Math.floor(Math.random() * 3)]();
};

const flowConfusion = () => {
  try {
    chaos();
  } catch (e) {
    if (e instanceof ErrorB) {
      throw new ErrorB();
    }
    chaos();
    try {
      chaos();
    } catch (ee) {
      if (e instanceof ErrorA) {
        console.log("A");
      } else {
        console.log("Something else");
      }
    }
  }
  console.log("Huh?");
};

console.log("flowConfusion", flowConfusion());
// => ???

// =============================================================================
// Part 3: Either implementation
// =============================================================================

// export type Left<E> = // ...
// export type Right<A> = // ...

// export type Either<E, A> = // ...

// export const right // ...
// export const left // ...

// export const isLeft // ...
// export const isRight // ...

// Does `map` still mean something useful?

// Does `chain` still mean something useful?

// =============================================================================
// Part 4: Examples
// =============================================================================

// -----------------------------------------------------------------------------
// Using `Either`
// -----------------------------------------------------------------------------

// declare function openFile(): Either<Error, string>;

// const trim = (data: string): Either<Error, string> =>
//   data.startsWith("Data: ")
//     ? right(data.slice(0, "Data: ".length))
//     : left(new Error("Malformed file"));

// How can we sequence these?

// -----------------------------------------------------------------------------
// Ergonomics: function composition with `flow`
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Differing error types
// -----------------------------------------------------------------------------

// class FileMissingError extends Error {}

// declare function openFile(): Either<FileMissingError, string>;

// class ArgumentError extends Error {}

// const trim = (data: string): Either<ArgumentError, string> =>
//   data.startsWith("Data: ")
//     ? right(data.slice(0, "Data: ".length))
//     : left(new Error("Malformed file"));

// How can we sequence these?

// =============================================================================
// Part 5: Etc
// =============================================================================

// map, but for the error?
