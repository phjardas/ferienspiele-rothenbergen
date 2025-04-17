import { setGlobalOptions } from "firebase-functions/v2";
import waiver from "./getWaiver";
import handleRegistration from "./handleRegistration";

setGlobalOptions({ region: "europe-west1" });

export { handleRegistration, waiver };
