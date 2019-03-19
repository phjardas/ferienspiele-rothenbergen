import url from 'url';
import admin from './admin';
import createWaiver from './createWaiver';
import { onRequest } from './http';

const bucket = admin.storage().bucket();
const registrationsColl = admin.firestore().collection('registrations');

async function createWaiverFile(registrationId, file) {
  const doc = await registrationsColl.doc(registrationId).get();
  if (!doc.exists) return res.status(404).end();

  await new Promise(async (resolve, reject) => {
    const reg = { ...doc.data(), id: doc.id };
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

export default onRequest(async (req, res) => {
  const { pathname } = url.parse(req.url);
  const registrationId = pathname.substring(1);
  const file = bucket.file(`waiver-${registrationId}.pdf`);

  const [exists] = await file.exists();
  if (!exists) {
    console.info('Creating waiver for registration: %s', registrationId);
    await createWaiverFile(registrationId, file);
  }

  res.send({ id: file.id });
});
