import * as nodemailer from "nodemailer";
import { configuration } from "../configuration";

export default createTransport();

function createTransport() {
  if (process.env.NODE_ENV === "test") {
    return {
      jsonTransport: true,
    };
  }

  const url = `smtps://${encodeURIComponent(configuration.gmail.email)}:${encodeURIComponent(configuration.gmail.password)}@smtp.gmail.com`;
  return nodemailer.createTransport(url);
}
