import { firebase } from './firebase';
import 'firebase/storage';
import fetch from 'unfetch';
import config from './config';

const storage = firebase.storage();

export async function createWaiver(reg) {
  const url = `${config.apiUrl}/waiver/${reg.id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.statusText} (${response.status})`);
  }

  const { id } = await response.json();
  const ref = storage.ref(id);
  return ref.getDownloadURL();
}
