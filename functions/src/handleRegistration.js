import * as functions from "firebase-functions/v1";
import createWaiver from "./createWaiver";
import redeemInvitation from "./redeemInvitation";
import sendRegistrationMail from "./sendRegistrationMail";
import updateKuchenStatistics from "./updateKuchenStatistics";
import updateRegistrationStatus from "./updateRegistrationStatus";

async function handleRegistration(snapshot) {
  const id = snapshot.id;
  const reg = { ...snapshot.data(), id };
  const waiverFile = await createWaiver(reg, "pdf");

  return Promise.all([
    sendRegistrationMail(reg, waiverFile),
    redeemInvitation(reg),
    updateRegistrationStatus(reg),
    updateKuchenStatistics(reg),
  ]);
}

export default functions.firestore
  .document("/registrations/{id}")
  .onCreate(handleRegistration);
