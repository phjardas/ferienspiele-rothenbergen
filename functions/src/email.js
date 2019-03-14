import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

const gmailConfig = functions.config().gmail;

export const mailTransport = nodemailer.createTransport(
  `smtps://${encodeURIComponent(gmailConfig.email)}:${encodeURIComponent(gmailConfig.password)}@smtp.gmail.com`
);
