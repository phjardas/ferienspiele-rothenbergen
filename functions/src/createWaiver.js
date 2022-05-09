import admin from './admin';
import createWaiverDoc from './waiver';

const bucket = admin.storage().bucket();

export default async function createWaiver(reg, format) {
  const filename = `waiver-${reg.id}.${format}`;
  const file = bucket.file(filename);

  const [exists] = await file.exists();
  console.log('%s exists: %s', filename, exists);

  if (!exists) {
    console.info('Creating waiver for %s in format %s', reg.id, format);
    await new Promise((resolve, reject) => {
      const waiver = createWaiverDoc(reg, format);
      const out = file.createWriteStream({
        contentType: format === 'pdf' ? 'application/pdf' : 'text/html',
      });

      waiver.pipe(out).on('finish', resolve).on('error', reject);

      typeof waiver.end === 'function' && waiver.end();
    });
  }

  return file;
}
