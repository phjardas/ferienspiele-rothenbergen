import * as nodemailer from "nodemailer";
import { getConfig } from "../configuration";

export default createTransport();

function createTransport() {
  if (process.env.NODE_ENV === "test") {
    return {
      jsonTransport: true,
    };
  }

  const config = getConfig();

  const url = `smtps://${encodeURIComponent(config.gmail.email)}:${encodeURIComponent(config.gmail.password)}@smtp.gmail.com`;
  return nodemailer.createTransport(url);
}
