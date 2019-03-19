import url from 'url';
import admin from './admin';
import createWaiver from './createWaiver';
import { onRequest } from './http';

const registrationsColl = admin.firestore().collection('registrations');

export default onRequest(async (req, res) => {
  const { pathname } = url.parse(req.url);
  const registrationId = pathname.substring(1);

  const doc = await registrationsColl.doc(registrationId).get();
  if (!doc.exists) return res.status(404).end();

  const reg = { ...doc.data(), id: doc.id };
  const file = await createWaiver(reg);
  res.send({ id: file.id });
});
