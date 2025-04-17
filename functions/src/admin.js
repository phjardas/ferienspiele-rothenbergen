import admin from "firebase-admin";
import { config } from "firebase-functions/v2";

if (!admin.apps.length) {
  admin.initializeApp(config().firebase);
}

export default admin;
