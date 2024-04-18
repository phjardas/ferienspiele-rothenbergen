import admin from "./admin";
import config from "./config";

const { maxParticipants, earlyCarePlaces, registrationDeadline } = config;
const configDoc = admin.firestore().collection("config").doc("config");
const registrationsColl = admin.firestore().collection("registrations");

async function getRegistrationCounts() {
  const documents = await registrationsColl.get();

  return {
    total: documents.size,
    earlyCare: documents.docs.filter((d) => d.get("earlyCare")).length,
  };
}

function getConfigurationStatus({ total, earlyCare }) {
  if (Date.now() > registrationDeadline.getTime()) {
    return {
      registrationStatus: "deadlineExpired",
      spotsLeft: 0,
      earlySpotsLeft: 0,
    };
  }

  if (total >= maxParticipants) {
    return {
      registrationStatus: "maxParticipants",
      spotsLeft: 0,
      earlySpotsLeft: 0,
    };
  }

  return {
    registrationStatus: "open",
    spotsLeft: maxParticipants - total,
    earlySpotsLeft: earlyCarePlaces - earlyCare,
  };
}

export default async function updateRegistrationStatus() {
  const counts = await getRegistrationCounts();
  const status = getConfigurationStatus(counts);
  await configDoc.set(status);
}
