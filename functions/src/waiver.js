import path from "path";
import PDFDocument from "pdfkit";
import { Readable } from "stream";
import config from "./config";
import { formatDate } from "./i18n";

export default function createWaiver(reg, format) {
  switch (format) {
    case "pdf":
      return createPDF(reg);
    case "html":
      return createHTML();
    default:
      throw new Error(`Unsupported waiver format: ${format}`);
  }
}

function createPDF(reg) {
  const doc = new PDFDocument({
    size: "a4",
    margins: { top: 40, left: 80, right: 40, bottom: 30 },
  });

  const title = `Einverständniserklärung für ${reg.child.firstName} ${reg.child.lastName}`;
  doc.info.Author = "Kinderferienspiele Rothenbergen";
  doc.info.Title = title;

  bold(doc).fontSize(18).text(`Kinderferienspiele Rothenbergen ${config.year}`);

  bold(doc).fontSize(14).text(title);
  doc.moveDown();

  regular(doc).fontSize(11);

  const appendLines = (lines) =>
    lines.forEach((line) => {
      doc.text(line);
      doc.moveDown();
    });

  appendLines(createBody());
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  appendLines(createFooter());

  return doc;
}

function createHTML() {
  const s = new Readable();
  createBody()
    .map((line) => `<p>${line}</p>`)
    .forEach((line) => s.push(line));
  s.push(null);
  return s;
}

const fontsDir = path.resolve(__dirname, "fonts");

function regular(doc) {
  return doc.font(path.resolve(fontsDir, "OpenSans-Regular.ttf"));
}

function bold(doc) {
  return doc.font(path.resolve(fontsDir, "OpenSans-Bold.ttf"));
}

function createBody() {
  return [
    `Hiermit erkläre ich mich einverstanden, dass mein Kind an den Kinderferienspielen Rothenbergen vom ${formatDate(
      config.startDate,
    )} bis ${formatDate(config.endDate)} teilnehmen darf.`,
    `Mir ist bekannt, dass die Anmeldung erst gültig ist, wenn diese Einverständniserklärung unterschrieben vorliegt und alle notwendigen Zahlungen geleistet sind.`,
    `Bei einer Absage durch teilnehmende Personen kann die Rückerstattung des Beitrages nach dem ${formatDate(
      config.registrationDeadline,
    )} nicht garantiert werden.`,
    `Mein Kind ist von mir angewiesen, den Anordnungen der Aufsichtspersonen Folge zu leisten. Die Aufsichtsführenden haben das Recht, mein Kind bei fortwährender Missachtung von Regeln und Anweisungen nach Hause zu schicken und von der weiteren Teilnahme auszuschließen. Eine Beitragserstattung erfolgt in diesem Fall nicht.`,
    `Ich garantiere, dass unter der Telefonnummer des Notfallkontaktes jederzeit jemand erreichbar ist.`,
    `Mir ist bewusst, dass in Ausnahmefällen die Aufsicht für kurze Zeit auch von einer minderjährigen Person wahrgenommen werden wird.`,
    `Ich bin damit einverstanden, dass mein Kind in Ausnahmesituationen im privateigenen Pkw befördert wird.`,
    `Meine Angaben in Bezug auf Allergien und Unverträglichkeiten sind vollständig.`,
    `Die Veranstalter haften nicht für den Verlust oder die Beschädigung von Gegenständen.`,
    `Es werden während der Ferienspiele Fotos gemacht. Ich bin mit deren Veröffentlichung ohne Namensnennung auf den Homepages und in den Gemeindebriefen der drei ausrichtenden Kirchengemeinden sowie im Ferienspiele-Journal einverstanden. Das ausgedruckte Journal wird bei den Ferienspielen verteilt und den Firmen/Organisationen zugesandt, die die Ferienspiele per Sponsoring oder Spende unterstützen.`,
  ].map((line) => line.trim());
}

function createFooter() {
  return [
    `Datum, Unterschrift`,
    `Bitte schicken Sie diese Einverständniserklärung bis zum ${formatDate(
      config.waiverDeadline,
    )} unterschrieben an Pfarrerin Ligaya Jardas, Schieferbergstraße 33, 63571 Gelnhausen oder geben sie in einem verschlossenen Umschlag dort ab, Einwurf in den Briefkasten genügt.`,
    `Alle Zahlungen überweisen Sie bitte bis zum ${formatDate(
      config.waiverDeadline,
    )} auf das Konto der Evangelisch-Methodistischen Kirche: EMK Rothenbergen, IBAN: DE38 5075 0094 0027 0509 92`,
  ].map((line) => line.trim());
}
