import * as uuidv4 from 'uuid/v4';
import * as baseX from 'base-x';

const { encode } = baseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

export function createId() {
  const uuid = uuidv4().replace('-', '');
  return encode(uuid);
}
