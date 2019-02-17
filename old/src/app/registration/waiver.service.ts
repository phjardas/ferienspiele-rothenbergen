import { Injectable } from '@angular/core';
import * as PDF from 'jspdf';

import { environment } from '../../environments/environment';
import { Configuration } from '../configuration.service';
import { Registration } from '../model';

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
      doc
        .setFontType(type)
        .setFontSize(size)
        .text(txt, 15, offset);
      offset += (txt.match(/\n/g) || []).length * size * lineHeight + 7;
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

    normal(
      `Hiermit erkläre ich mich einverstanden, dass ${reg.child.gender.id === 'w' ? 'meine Tochter' : 'mein Sohn'} ${reg.child.firstName} ${
        reg.child.lastName
      } \n` + `an den Kinderferienspielen Rothenbergen vom ${date(environment.startDate)} bis ${date(environment.endDate)} teilnehmen darf.`
    );

    offset += 5;

    normal(
      `Mir ist bekannt, dass die Anmeldung erst gültig ist, wenn diese Einverständniserklärung unterschrieben vorliegt und alle
notwendigen Zahlungen geleistet sind.`
    );
    normal(
      `Bei einer Absage durch teilnehmende Personen kann die Rückerstattung des Beitrages nach dem ${date(
        config.registrationDeadline
      )} nicht
garantiert werden.`
    );

    normal(
      `Mein Kind ist von mir angewiesen, den Anordnungen der Aufsichtspersonen Folge zu leisten. Die Aufsichtsführenden haben
das Recht, mein Kind bei fortwährender Missachtung von Regeln und Anweisungen nach Hause zu schicken und von der
weiteren Teilnahme auszuschließen. Eine Beitragserstattung erfolgt in diesem Fall nicht.`
    );

    normal(`Ich garantiere, dass unter der Telefonnummer des Notfallkontaktes jederzeit jemand erreichbar ist.`);

    normal(
      `Mir ist bewusst, dass in Ausnahmefällen die Aufsicht für kurze Zeit auch von einer minderjährigen Person wahrgenommen
werden wird.`
    );

    normal(`Ich bin damit einverstanden, dass mein Kind in Ausnahmesituationen im privateigenen PKW befördert wird.`);

    normal(`Meine Angaben in Bezug auf Allergien und Unverträglichkeiten sind vollständig.`);

    normal(`Die Veranstalter haften nicht für den Verlust oder die Beschädigung von Gegenständen.`);

    normal(
      `Es werden während der Ferienspiele Fotos gemacht. Ich bin mit deren Veröffentlichung auf den Homepages und in den
Gemeindebriefen der drei ausrichtenden Kirchengemeinden einverstanden.`
    );

    offset += 20;
    bold('Datum, Unterschrift');

    normal(
      `Bitte schicken Sie diese Einverständniserklärung bis zum ${date(
        config.waiverDeadline
      )} unterschrieben an das Gemeindebüro der katholischen \n` + 'Kirche oder geben sie in einem verschlossenen Umschlag dort ab.'
    );
    normal('Büro der Katholischen Kirche "Christkönig", Niedergründauer Straße 20, 63584 Rothenbergen, Einwurf in den Briefkasten genügt.');
    normal('Sie können das Geld und die Einverständniserklärung auch im Sekretariat der Anton Calaminus Schule in Rothenbergen abgeben.');

    return doc.output('blob');
  }
}
