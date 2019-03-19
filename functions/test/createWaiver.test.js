import fs from 'fs';
import createWaiver from '../src/createWaiver';

describe('createWaiver', () => {
  it('should work', async () => {
    const reg = {
      child: {
        firstName: 'Noah',
        lastName: 'Schäfer',
      },
    };

    const waiver = createWaiver(reg);
    waiver.pipe(fs.createWriteStream('waiver.pdf'));
    waiver.end();
  });
});
