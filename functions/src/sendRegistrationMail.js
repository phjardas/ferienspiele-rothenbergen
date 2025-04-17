import config from "./config";
import { getEmail, helpers } from "./email";

export default function sendRegistrationMail(reg, waiverFile) {
  const attachments = [];
  if (waiverFile) {
    attachments.push({
      filename: "Einverständniserklärung.pdf",
      contentType: "application/pdf",
      content: waiverFile.createReadStream(),
    });
  }

  return getEmail().send({
    template: "registration",
    message: {
      to: reg.parent.email,
      attachments,
    },
    locals: {
      reg,
      config,
      ...helpers,
    },
  });
}
