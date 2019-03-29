import 'firebase/storage';
import { fetch } from 'whatwg-fetch';
import config from './config';

export async function createWaiver(id, format = 'pdf') {
  const url = `${config.apiUrl}/waiver/${id}.${format}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.statusText} (${response.status})`);
  }

  return response;
}
