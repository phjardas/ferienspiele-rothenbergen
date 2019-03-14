import * as Sentry from '@sentry/browser';
import React from 'react';
import SentryBoundary from './SentryBoundary';

export default function SentryWrapper({ children }) {
  if (process.env.REACT_APP_SENTRY_URL) {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_URL,
      environment: 'production',
      release: `ferienspiele-rothenbergen@${process.env.REACT_APP_COMMIT_HASH}`,
    });

    return <SentryBoundary>{children}</SentryBoundary>;
  }

  return children;
}
