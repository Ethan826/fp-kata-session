/* eslint-disable @typescript-eslint/no-unused-vars */
// =============================================================================
// Part 1: Nullability with unions
// =============================================================================

// Learning goal: TypeScript handles nullable values like other union types

type User = {
  readonly email: string;
  readonly zipCode: string | number;
  readonly linkedInProfile: string | null;
};

/**
 * Given a `User`'s ID, query the database, returning a `User` or `null` if the
 * user wasn't found
 */
declare function queryUserDatabase(userId: number): User | null;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const zip = queryUserDatabase(33).zipCode;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const truncatedZip = zip.slice(0, 5);

const processZip = (userId: number): string | null => {
  throw new Error("Not implemented!");
};

// =============================================================================
// Part 2. Alternatives
// =============================================================================

// Learning goal: Consider other ways of modeling nullability that could reduce
// boilerplate

type Purchase = {
  readonly price: number;
  readonly giftRecipient: User | null;
};

/**
 * Given a `Purchase`'s ID, query the database, returning a `Purchase` or `null`
 * if the purchase wasn't found
 */
declare function queryPurchaseDatabase(purchaseId: number): Purchase | null;

/** Get the LinkedIn profile for the purchase's gift recipient, if it exists. */
const getGifteeLinkedIn: (purchaseId: number) => string | null = (
  purchaseId,
) => {
  const purchase = queryPurchaseDatabase(purchaseId);
  if (purchase == null) return null;

  const { giftRecipient } = purchase;
  if (giftRecipient == null) return null;

  const { linkedInProfile } = giftRecipient;
  return linkedInProfile;
};

// Step 1: Let's consider an alternative API

type WeirdUser = {
  readonly email: string;
  readonly zipCode: ReadonlyArray<string>;
  readonly linkedInProfile: ReadonlyArray<string>;
};

type WeirdPurchase = {
  readonly price: number;
  readonly giftRecipient: ReadonlyArray<WeirdUser>;
};

declare function weirdQueryPurchaseDatabase(
  weirdPurchaseId: number,
): ReadonlyArray<WeirdPurchase>;

// Implement me
// (Psst... don't help by annotating return types yet)
const weirdGetGifteeLinkedIn = (weirdPurchaseId: number) => {
  throw new Error("Not implemented!");
};

// =============================================================================
// Part 3. The `Option` type
// =============================================================================

// Learning goal: Implement the `Option` type and get the tests to pass to
// understand how it works in fp-ts and other languages/libraries.

// type Some// ???
// type None// ???
// type Option = ???

// const some // ???
// const none // ???

// const map // ???
// const chain // ???
