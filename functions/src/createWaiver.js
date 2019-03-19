import admin from './admin';
import createWaiverDoc from './waiver';

const bucket = admin.storage().bucket();

export default async function createWaiver(reg) {
  const file = bucket.file(`waiver-${reg.id}.pdf`);

  const [exists] = await file.exists();
  if (!exists) {
    console.info('Creating waiver for %s', reg.id);
    await new Promise((resolve, reject) => {
      const waiver = createWaiverDoc(reg);
      const out = file.createWriteStream({
        contentType: 'application/pdf',
      });
      waiver
        .pipe(out)
        .on('finish', resolve)
        .on('error', reject);
      waiver.end();
    });
  }

  return file;
}
