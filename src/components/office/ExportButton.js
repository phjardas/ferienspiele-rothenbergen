import { Button } from '@material-ui/core';
import React from 'react';
import { exportRegistrations } from '../../api/csv';

export default function ExportButton({ registrations, ...props }) {
  const doExport = () => {
    const blob = exportRegistrations(registrations);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ferienspiele Rothenbergen Anmeldungen.csv`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button color="primary" onClick={doExport} {...props}>
      Exportieren
    </Button>
  );
}
