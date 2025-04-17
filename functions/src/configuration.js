import { defineString } from "firebase-functions/params";

export const configuration = {
  gmail: {
    email: defineString("GMAIL_EMAIL"),
    password: defineString("GMAIL_PASSWORD"),
  },
};
