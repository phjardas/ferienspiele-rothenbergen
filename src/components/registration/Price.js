import { List, ListItem, withStyles } from '@material-ui/core';
import { EuroSymbol as EuroIcon } from '@material-ui/icons';
import React from 'react';
import Condition from '../form/Condition';
import FieldSet from '../form/FieldSet';
import Currency from '../Currency';

function Price({ classes }) {
  return (
    <Condition when="price" is={p => !!p}>
      {({ elements, total }) => (
        <FieldSet icon={<EuroIcon />} title="Teilnahmebeitrag">
          <List dense disablePadding>
            {elements.map(el => (
              <ListItem key={el.label} className={classes.item}>
                <span className={classes.label}>{el.label}</span>
                <span className={classes.price}>
                  <Currency amount={el.value} />
                </span>
              </ListItem>
            ))}
            <ListItem key="total" className={`${classes.item} ${classes.total}`}>
              <span className={classes.label}>Gesamtbetrag</span>
              <span className={classes.price}>
                <Currency amount={total} />
              </span>
            </ListItem>
          </List>
        </FieldSet>
      )}
    </Condition>
  );
}

const styles = ({ palette, typography }) => ({
  item: {
    ...typography.body1,
  },
  label: {},
  price: {
    marginLeft: 'auto',
  },
  total: {
    fontWeight: 500,
    borderTop: `1px solid ${palette.grey[400]}`,
  },
});

export default withStyles(styles)(Price);
