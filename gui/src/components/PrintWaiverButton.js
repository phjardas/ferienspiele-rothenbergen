import * as Sentry from '@sentry/browser';
import React, { useState, useRef, useEffect } from 'react';
import { createWaiver } from '../api/waiver';
import SpinningButton from './SpinningButton';

export default function PrintWaiverButton({ registration, ...rest }) {
  const [{ loading, url }, setState] = useState({});
  const ref = useRef();

  useEffect(() => url && ref.current && ref.current.click(), [ref.current, url]);

  const onClick = async () => {
    try {
      setState({ loading: true });
      const downloadUrl = await createWaiver(registration);
      setState({ url: downloadUrl });
    } catch (error) {
      console.error('Error printing waiver:', error);
      Sentry.captureException(error);
      alert('Beim Drucken der Einverständniserklärung ist leider ein Fehler aufgetreten.');
      setState({ error });
    }
  };

  return (
    <>
      <SpinningButton spinning={loading} onClick={onClick} {...rest} />
      {url && (
        <a
          href={url}
          ref={ref}
          target="_blank"
          rel="noreferrer noopener"
          download={`Einverständniserklärung ${registration.child.firstName} ${registration.child.lastName}.pdf`}
          aria-hidden="true"
        >
          öffnen
        </a>
      )}
    </>
  );
}
