import { List, ListItem, withStyles } from '@material-ui/core';
import React from 'react';
import Currency from '../Currency';

function PriceTable({ price: { elements, total }, classes }) {
  return (
    <List dense disablePadding>
      {elements.map(el => (
        <ListItem key={el.label} className={classes.item}>
          <span>{el.label}</span>
          <span className={classes.price}>
            <Currency amount={el.value} />
          </span>
        </ListItem>
      ))}
      <ListItem key="total" className={`${classes.item} ${classes.total}`}>
        <span>Gesamtbetrag</span>
        <span className={classes.price}>
          <Currency amount={total} />
        </span>
      </ListItem>
    </List>
  );
}

const styles = ({ palette, typography }) => ({
  item: {
    ...typography.body2,
  },
  price: {
    marginLeft: 'auto',
  },
  total: {
    fontWeight: 500,
    borderTop: `1px solid ${palette.grey[400]}`,
  },
});

export default withStyles(styles)(PriceTable);
