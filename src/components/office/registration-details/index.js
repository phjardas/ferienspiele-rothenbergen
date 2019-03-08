import React from 'react';

export default function RegistrationDetails({ registration }) {
  return <pre>{JSON.stringify(registration, null, 2)}</pre>;
}
