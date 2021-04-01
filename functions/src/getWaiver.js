import url from 'url';
import admin from './admin';
import createWaiver from './createWaiver';
import { onRequest } from './http';

const registrationsColl = admin.firestore().collection('registrations');

export default onRequest(async (req, res) => {
  const { pathname } = url.parse(req.url);
  const [registrationId, format] = pathname.substring(1).split('.');

  const reg = await getRegistration(registrationId);
  const file = await createWaiver(reg, format);
  const [meta] = await file.getMetadata();
  res
    .set('content-type', meta.contentType)
    .set('content-length', meta.size)
    .set('etag', meta.etag)
    .set('cache-control', 'public, max-age=315360000');
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

  const doc = await registrationsColl.doc(registrationId).get();
  if (!doc.exists) throw new Error('Anmeldung nicht gefunden');

  return { ...doc.data(), id: doc.id };
}
