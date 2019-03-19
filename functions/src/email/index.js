import Email from 'email-templates';
import path from 'path';
import transport from './transport';
import { formatDate } from '../i18n';

const from = '"Ferienspiele Rothenbergen" <ferienspiele.rothenbergen@gmail.com>';

export const helpers = {
  formatDate,
};

export default new Email({
  views: {
    root: path.resolve(__dirname, 'templates'),
  },
  juice: true,
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: path.resolve(__dirname, 'templates'),
    },
  },
  message: {
    from,
  },
  transport,
  subjectPrefix: '[Ferienspiele Rothenbergen] ',
});
