// PSST... nobody "help" by annotating types yet.
// const weirdGetGifteeLinkedIn = (weirdPurchaseId: number) =>
//   weirdQueryPurchaseDatabase(weirdPurchaseId).map((weirdPurchase) =>
//     weirdPurchase.giftRecipient.map(
//       (giftRecipient) => giftRecipient.linkedInProfile,
//     ),
//   );

type Some<A> = { _tag: "Some"; value: A };
export type None = { _tag: "None" };

export type Option<A> = Some<A> | None;

export const isSome = <A>(u: Option<A>): u is Some<A> => u._tag === "Some";
export const isNone = <A>(u: Option<A>): u is None => u._tag === "None";

export const some: <A>(value: A) => Some<A> = <A>(value: A) => ({
  value,
  _tag: "Some",
});

export const none: None = { _tag: "None" };

export const map = <A, B>(func: (a: A) => B, a: Option<A>): Option<B> =>
  isSome(a) ? some(func(a.value)) : none;

export const chain = <A, B>(
  func: (a: A) => Option<B>,
  a: Option<A>,
): Option<B> => (isSome(a) ? func(a.value) : none);

const processZip = (userId: number): string | null => {
  const user = queryUserDatabase(userId);
  if (user === null) return null;

  const { zipCode } = user;

  if (typeof zipCode === "string") {
    return zipCode.slice(0, 5);
  } else {
    return zipCode.toString().slice(0, 5);
  }
};
