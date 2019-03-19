import config from './config';
import email, { helpers } from './email';

export default function sendRegistrationMail(reg, waiverFile) {
  return email.send({
    template: 'registration',
    message: {
      to: reg.parent.email,
    },
    locals: {
      reg,
      config,
      ...helpers,
    },
  });
}
