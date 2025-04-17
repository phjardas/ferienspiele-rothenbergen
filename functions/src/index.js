import { setGlobalOptions } from "firebase-functions/v2";
import waiver from "./getWaiver";
import handleRegistration from "./handleRegistration";

setGlobalOptions({ region: "eu-west-3" });

export { handleRegistration, waiver };
