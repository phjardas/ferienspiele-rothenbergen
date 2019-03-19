import PDFDocument from 'pdfkit';
import config from './config';
import path from 'path';
import { formatDate } from './i18n';

export default function createWaiver(reg) {
  const doc = new PDFDocument({
    size: 'a4',
    margins: { top: 30, left: 80, right: 30, bottom: 30 },
  });

  doc.info.Author = 'Ferienspiele Rothenbergen';
  doc.info.Title = `Einverständniserklärung für ${reg.child.firstName} ${reg.child.lastName}`;

  bold(doc)
    .fontSize(18)
    .text(`Kinderferienspiele Rothenbergen ${config.year}`);

  bold(doc)
    .fontSize(14)
    .text(`Einverständniserklärung für ${reg.child.firstName} ${reg.child.lastName}`);
  doc.moveDown();

  regular(doc).fontSize(11);

  createBody(reg)
    .trim()
    .split(/\n/)
    .map(line => line.trim())
    .forEach(line => {
      if (line.length) {
        doc.text(line);
      } else {
        doc.moveDown();
      }
    });

  return doc;
}

const fontsDir = path.resolve(__dirname, 'fonts');

function regular(doc) {
  return doc.font(path.resolve(fontsDir, 'OpenSans-Regular.ttf'));
}

function bold(doc) {
  return doc.font(path.resolve(fontsDir, 'OpenSans-Bold.ttf'));
}

function createBody(reg) {
  return `
Hiermit erkläre ich mich einverstanden, dass ${reg.child.firstName} ${
    reg.child.lastName
  } an den Kinderferienspielen Rothenbergen vom ${formatDate(config.startDate)} bis ${formatDate(config.endDate)} teilnehmen darf.

Mir ist bekannt, dass die Anmeldung erst gültig ist, wenn diese Einverständniserklärung unterschrieben vorliegt und alle notwendigen Zahlungen geleistet sind.

Bei einer Absage durch teilnehmende Personen kann die Rückerstattung des Beitrages nach dem ${formatDate(
    config.registrationDeadline
  )} nicht garantiert werden.

Mein Kind ist von mir angewiesen, den Anordnungen der Aufsichtspersonen Folge zu leisten. Die Aufsichtsführenden haben das Recht, mein Kind bei fortwährender Missachtung von Regeln und Anweisungen nach Hause zu schicken und von der weiteren Teilnahme auszuschließen. Eine Beitragserstattung erfolgt in diesem Fall nicht.

Ich garantiere, dass unter der Telefonnummer des Notfallkontaktes jederzeit jemand erreichbar ist.

Mir ist bewusst, dass in Ausnahmefällen die Aufsicht für kurze Zeit auch von einer minderjährigen Person wahrgenommen werden wird.

Ich bin damit einverstanden, dass mein Kind in Ausnahmesituationen im privateigenen Pkw befördert wird.

Meine Angaben in Bezug auf Allergien und Unverträglichkeiten sind vollständig.

Die Veranstalter haften nicht für den Verlust oder die Beschädigung von Gegenständen.

Es werden während der Ferienspiele Fotos gemacht. Ich bin mit deren Veröffentlichung auf den Homepages und in den Gemeindebriefen der drei ausrichtenden Kirchengemeinden einverstanden.






Datum, Unterschrift

Bitte schicken Sie diese Einverständniserklärung bis zum ${formatDate(
    config.waiverDeadline
  )} unterschrieben an das Gemeindebüro der katholischen Kirche oder geben sie in einem verschlossenen Umschlag dort ab.

Büro der Katholischen Kirche "Christkönig", Niedergründauer Straße 20, 63584 Rothenbergen, Einwurf in den Briefkasten genügt.

Sie können das Geld und die Einverständniserklärung auch im Sekretariat der Anton Calaminus Schule in Rothenbergen abgeben.`;
}
