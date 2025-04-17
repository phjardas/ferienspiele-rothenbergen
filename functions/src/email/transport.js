import { defineString } from "firebase-functions/params";
import * as nodemailer from "nodemailer";
import { memoize } from "../memo";

const email = defineString("GMAIL_EMAIL");
const password = defineString("GMAIL_PASSWORD");

export const getTransport = memoize(() => {
  if (process.env.NODE_ENV === "test") {
    return {
      jsonTransport: true,
    };
  }

  const url = `smtps://${encodeURIComponent(email.value())}:${encodeURIComponent(password.value())}@smtp.gmail.com`;
  return nodemailer.createTransport(url);
});
