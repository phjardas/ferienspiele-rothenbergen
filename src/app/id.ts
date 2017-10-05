import uuid from 'uuid-base62';

export function createId() {
  return uuid.v4().replace(/-/g, '');
}

console.log('UUID:', createId());
