import * as Sentry from '@sentry/browser';
import React, { Component } from 'react';
import GlobalError from './GlobalError';

export default class SentryBoundary extends Component {
  state = { error: null };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });

    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => scope.setExtra(key, errorInfo[key]));
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.error) {
      return <GlobalError error={this.state.error} />;
    }

    return this.props.children;
  }
}
