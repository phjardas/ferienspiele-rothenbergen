import { onDocumentCreated } from "firebase-functions/v2/firestore";
import createWaiver from "./createWaiver";
import redeemInvitation from "./redeemInvitation";
import sendRegistrationMail from "./sendRegistrationMail";
import updateKuchenStatistics from "./updateKuchenStatistics";
import updateRegistrationStatus from "./updateRegistrationStatus";

async function handleRegistration(event) {
  console.log("handleRegistration:", event);
  const snapshot = event.data;
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

export default onDocumentCreated("/registrations/{id}", handleRegistration);
