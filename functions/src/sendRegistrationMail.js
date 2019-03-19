import config from './config';
import email, { helpers } from './email';

export default function sendRegistrationMail(reg) {
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
