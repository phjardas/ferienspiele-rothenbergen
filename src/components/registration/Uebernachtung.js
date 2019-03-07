import { Hotel as HotelIcon } from '@material-ui/icons';
import React from 'react';
import FieldSet from '../form/FieldSet';
import Radios from '../form/Radios';

export default function Uebernachtung() {
  return (
    <FieldSet
      icon={<HotelIcon />}
      title="Übernachtung"
      subtitle="Am Donnerstag bieten wir den Kindern ein besonders Highlight: eine Übernachtung in der Bergkirche."
    >
      <Radios
        name="uebernachtung.type"
        required
        options={[
          { value: 'uebernachtung', label: 'Mein Kind nimmt an der Übernachtung teil.' },
          { value: 'none', label: 'Mein Kind nimmt an der Übernachtung nicht teil und wird zur gewohnten Uhrzeit abgeholt.' },
        ]}
      />
    </FieldSet>
  );
}
