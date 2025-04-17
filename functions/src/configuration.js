import { defineString } from "firebase-functions/params";
import { memo } from "./memo";

const gmailEmail = defineString("GMAIL_EMAIL");
const gmailPassword = defineString("GMAIL_PASSWORD");

export const getConfig = memo(() => {
  return {
    gmail: {
      email: gmailEmail.value(),
      password: gmailPassword.value(),
    },
  };
});
