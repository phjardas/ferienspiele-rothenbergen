import fs from 'fs';
import createWaiver from '../src/createWaiver';

describe('createWaiver', () => {
  it('should work', async () => {
    const reg = {
      child: {
        firstName: 'Testine',
        lastName: 'Tester',
      },
    };

    const waiver = createWaiver(reg);
    waiver.pipe(fs.createWriteStream('waiver.pdf'));
    waiver.end();
  });
});
