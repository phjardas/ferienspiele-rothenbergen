import Email from "email-templates";
import path from "path";
import { formatDate } from "../i18n";
import { memoize } from "../memo";
import { getTransport } from "./transport";

const from =
  '"Ferienspiele Rothenbergen" <ferienspiele.rothenbergen@gmail.com>';

export const helpers = {
  formatDate,
};

export const getEmail = memoize(
  () =>
    new Email({
      views: {
        root: path.resolve(__dirname, "templates"),
      },
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: path.resolve(__dirname, "templates"),
        },
      },
      message: {
        from,
      },
      transport: getTransport(),
      subjectPrefix: "[Ferienspiele Rothenbergen] ",
    }),
);
