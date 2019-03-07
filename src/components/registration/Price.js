import { EuroSymbol as EuroIcon } from '@material-ui/icons';
import React from 'react';
import Condition from '../form/Condition';
import FieldSet from '../form/FieldSet';
import PriceTable from './PriceTable';

export default function Price() {
  return (
    <Condition when="price" is={p => !!p}>
      {price => (
        <FieldSet icon={<EuroIcon />} title="Teilnahmebeitrag">
          <PriceTable price={price} />
        </FieldSet>
      )}
    </Condition>
  );
}
