import { v4 } from 'uuid-base62';

export function createId() {
  return v4().replace(/-/g, '');
}
