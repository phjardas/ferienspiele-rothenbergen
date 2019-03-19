import admin from './admin';
import createWaiver from './waiver';

const bucket = admin.storage().bucket();

export default async function createWaiver(reg) {
  const file = bucket.file(`waiver-${registrationId}.pdf`);

  const [exists] = await file.exists();
  if (!exists) {
    await new Promise((resolve, reject) => {
      const waiver = createWaiver(reg);
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
