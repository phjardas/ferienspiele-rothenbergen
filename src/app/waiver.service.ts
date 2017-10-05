import { Injectable } from '@angular/core';
import * as PDF from 'jspdf';

import { environment } from '../environments/environment';
import { Configuration } from './configuration.service';
import { Registration } from './model';

@Injectable()
export class WaiverService {
  createWaiver(reg: Registration, config: Configuration): Blob {
    const doc = new PDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const lineHeight = 0.4;
    let offset = 20;
    const text = (txt: string, size: number, type: string) => {
      doc.setFontType(type).setFontSize(size).text(txt, 15, offset);
      offset += ((txt.match(/\n/g) || []).length) * size * lineHeight + 7;
    };
    const normal = txt => text(txt, 9, 'normal');
    const bold = txt => text(txt, 9, 'bold');
    const h1 = txt => text(txt, 18, 'bold');
    const h2 = txt => text(txt, 14, 'bold');
    const h3 = txt => text(txt, 10, 'bold');
    const date = d => {
      const [year, month, day] = d.split(/-/);
      return `${day}.${month}.${year}`;
    };

    h1(`Kinderferienspiele Rothenbergen ${environment.year}`);
    h2(`Einverständniserklärung für ${reg.child.firstName} ${reg.child.lastName}`);

    normal(`Hiermit erkläre ich mich einverstanden, dass ${reg.child.gender.id === 'w' ? 'meine Tochter' : 'mein Sohn'} ${reg.child.firstName} ${reg.child.lastName} \n` +
      `bei den Kinderferienspielen Rothenbergen vom ${date(config.startDate)} bis ${date(config.endDate)} teilnehmen darf.`);

    offset += 5;
    h2('Teilnahmebedingungen');

    h3('Anmeldung und Zahlung');
    normal('Die Anmeldung ist gültig, wenn der unterschriebene Anmeldezettel vorliegt und alle notwendigen Zahlungen geleistet \n' +
      'sind. Eine Anmeldebestätigung ergeht nicht automatisch, kann aber telefonisch erbeten werden. Es erfolgen keine \n' +
      'nachträglichen Preisveränderungen.');

    h3('Zuschüsse und Abschläge');
    normal('Es gibt keine Rabatte, außer dem Mehrkinderrabatt, der bei der Anmeldung angeboten wurde. Zuschussfähige Familien \n' +
      '(z.B. Hartz IV) bekommen unter Umständen die Maßnahme vom zuständigen Amt erstattet. Es gelten die Bestimmungen \n' +
      'des jeweiligen Amtes.');

    h3('Absage');
    normal(`Eine Absage durch den Veranstalter kann nur erfolgen, wenn die Teilnehmer die Bedingungen nicht erfüllen. Bei einer \n` +
      `Absage durch die Teilnehmer kann die Rückerstattung des Betrages nach dem ${date(config.registrationDeadline)} nicht garantiert werden.`);

    h3('Zuständigkeit');
    normal('Mein Kind (meine Kinder) ist von mir angewiesen, den Anordnungen der Aufsichtspersonen Folge zu leisten. Die \n' +
      'Aufsichtsführenden haben das Recht, dem Kind bei fortwährender Missachtung von Regeln und Anweisungen nach Hause \n' +
      'zu schicken und von der weiteren Teilnahme auszuschließen. Auch darum garantiere ich, dass unter der Telefonnummer \n' +
      'des Notfallkontaktes jederzeit jemand erreichbar ist. Eine Erstattung eines Restbetrages erfolgt nicht. Mir ist bewusst, \n' +
      'dass in Ausnahmefällen die Aufsicht für kurze Zeit auch von einer minderjährigen Person wahrgenommen werden wird.');

    h3('Private Pkw');
    normal('Ich bin damit einverstanden, dass mein Kind in Ausnahmesituationen im privateigenen Pkw befördert wird.');

    h3('Öffentlichkeit');
    normal('Es werden während der Ferienspiele Fotos gemacht. Ich bin mit deren Veröffentlichung einverstanden.');

    h3('Gesundheit/Ansteckung');
    normal('Meine Angaben in Bezug auf gesundheitliche Gefahren und Risiken sind vollständig.');

    h3('Versicherungsschutz');
    normal('Mitarbeitende und Kinder sind während der Veranstaltung (einschließlich Ausflüge) im gewöhnlichen Umfang Haftpflicht- \n' +
      'und unfallversichert. Wir haften nicht für verschwundene Gegenstände. Bei Gebrauchselektronik (z.B. Handys) haften wir \n' +
      'weder bei Bruch noch bei Diebstahl.');

    h3('Schutz vor Übergriffen');
    normal('In Bezug auf körperliche und sexuelle Gewalt sind alle MitarbeiterInnen in die geltenden gesetzlichen Bestimmungen \n' +
      'eingeführt worden und haben diese per Unterschrift für sich auch als verbindlich erklärt. Alle MitarbeiterInnen haben \n' +
      'gemäß § 72a SGB VIII ein polizeiliches Führungszeugnis vorgelegt.');

    offset += 15;
    bold('Datum, Unterschrift');

    normal(`Bitte schicken Sie diese Einverständniserklärung bis zum ${date(config.waiverDeadline)} unterschrieben an das Gemeindebüro der katholischen \n` +
      'Kirche oder geben sie in einem verschlossenen Umschlag dort ab.');
    normal('Büro der Katholischen Kirche "Christkönig", Niedergründauer Straße 20, 63584 Rothenbergen, Einwurf in den Briefkasten genügt.');
    normal('Sie können das Geld und die Einverständniserklärung auch im Sekretariat der Anton Calaminus Schule in Rothenbergen abgeben.');

    return doc.output('blob');
  }
}
