import * as Sentry from '@sentry/browser';
import React, { useState } from 'react';
import { createWaiver } from '../api/waiver';
import SpinningButton from './SpinningButton';

async function printWaiver(reg) {
  const blob = await createWaiver(reg);
  const { document } = window;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Einverständniserklärung ${reg.child.firstName} ${reg.child.lastName}.pdf`;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function PrintWaiverButton({ registration, ...rest }) {
  const [loading, setLoading] = useState();

  const onClick = async () => {
    try {
      setLoading(true);
      await printWaiver(registration);
    } catch (error) {
      console.error('Error printing waiver:', error);
      Sentry.captureException(error);
      alert('Beim Drucken der Einverständniserklärung ist leider ein Fehler aufgetreten.');
    } finally {
      setLoading(false);
    }
  };

  return <SpinningButton spinning={loading} onClick={onClick} {...rest} />;
}
