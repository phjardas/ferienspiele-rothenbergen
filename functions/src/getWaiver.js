import url from 'url';
import admin from './admin';
import createWaiver from './createWaiver';
import { onRequest } from './http';

export default onRequest(async (req, res) => {
  console.log('path:', req.url);
  const { pathname } = url.parse(req.url);
  console.log('pathname:', pathname);
  const [registrationId, format] = pathname.substring(1).split('.');

  console.log('getWaiver', { registrationId, format });

  const reg = await getRegistration(registrationId);
  const file = await createWaiver(reg, format);
  const [meta] = await file.getMetadata();
  res
    .set('content-type', meta.contentType)
    .set('content-length', meta.size)
    .set('etag', meta.etag)
    .set('cache-control', 'private,no-cache');
  file.createReadStream().pipe(res);
});

async function getRegistration(registrationId) {
  if (registrationId === 'default') {
    return {
      id: 'default',
      child: {
        firstName: 'N.',
        lastName: 'N.',
      },
    };
  }

  const doc = await admin.firestore().collection('registrations').doc(registrationId).get();
  if (!doc.exists) throw new Error('Anmeldung nicht gefunden');

  return { ...doc.data(), id: doc.id };
}
