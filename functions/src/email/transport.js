import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

export default createTransport();

function createTransport() {
  if (process.env.NODE_ENV === 'test') {
    return {
      jsonTransport: true,
    };
  }

  const gmailConfig = functions.config().gmail;
  const url = `smtps://${encodeURIComponent(gmailConfig.email)}:${encodeURIComponent(gmailConfig.password)}@smtp.gmail.com`;
  return nodemailer.createTransport(url);
}
