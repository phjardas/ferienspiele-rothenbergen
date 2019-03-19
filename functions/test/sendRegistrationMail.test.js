import sendRegistrationMail from '../src/sendRegistrationMail';
import fs from 'fs';

describe('sendRegistrationMail', () => {
  it('should work', async () => {
    const result = await sendRegistrationMail({
      id: 'xxxxxxxxxx',
      child: {
        firstName: 'Testine',
        lastName: 'Tester',
      },
      parent: {
        email: 'ferienspiele-rothenbergen@mailinator.com',
      },
      kuchen: {
        date: '2019-07-01',
        name: 'Rüeblitorte',
      },
      uebernachtung: {
        type: 'uebernachtung',
      },
      price: {
        total: 35,
      },
    });

    const { subject, html, text } = JSON.parse(result.message);

    console.log(`Subject: ${subject}`);
    console.log(text);
    console.log(html);
    fs.writeFileSync('mail.html', html, 'utf-8');
  });
});
