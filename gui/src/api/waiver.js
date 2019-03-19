import fetch from 'unfetch';
import config from './config';

export async function createWaiver(reg) {
  const url = `${config.apiUrl}/waiver/${reg.id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.statusText} (${response.status})`);
  }

  return response.blob();
}
