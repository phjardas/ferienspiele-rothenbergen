import * as uuidv4 from 'uuid/v4';
import * as baseX from 'base-x';
import { Buffer } from 'buffer';

const { encode } = baseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

export function createId() {
  const buf = new Buffer(16);
  const uuid = uuidv4(null, buf);
  return encode(uuid);
}
