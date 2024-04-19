import admin from "./admin";

export default async function redeemInvitation(registration) {
  if (!registration.code) return

  const doc = admin.firestore().collection("invitations").doc(registration.code)

  await doc.update({
    redeemedAt: registration.registeredAt,
    registrationId: registration.id,
  }, { exists: true })
}
