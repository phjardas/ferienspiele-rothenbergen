import * as functions from "firebase-functions";
import createWaiver from "./createWaiver";
import sendRegistrationMail from "./sendRegistrationMail";
import updateKuchenStatistics from "./updateKuchenStatistics";
import updateRegistrationStatus from "./updateRegistrationStatus";

async function handleRegistration(snapshot) {
  const id = snapshot.id;
  const reg = { ...snapshot.data(), id };
  const waiverFile = await createWaiver(reg, "pdf");

  return Promise.all([
    sendRegistrationMail(reg, waiverFile),
    updateRegistrationStatus(reg),
    updateKuchenStatistics(reg),
  ]);
}

export default functions.firestore
  .document("/registrations/{id}")
  .onCreate(handleRegistration);
