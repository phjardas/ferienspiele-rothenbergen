import { config } from "firebase-functions/v2";
import * as nodemailer from "nodemailer";

export default createTransport();

function createTransport() {
  if (process.env.NODE_ENV === "test") {
    return {
      jsonTransport: true,
    };
  }

  const gmailConfig = config().gmail;
  const url = `smtps://${encodeURIComponent(gmailConfig.email)}:${encodeURIComponent(gmailConfig.password)}@smtp.gmail.com`;
  return nodemailer.createTransport(url);
}
