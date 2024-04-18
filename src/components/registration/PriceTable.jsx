import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import Currency from "../Currency";

export default function PriceTable({ price: { elements, total } }) {
  return (
    <List dense disablePadding>
      {elements.map((el) => (
        <ListItem key={el.label} disableGutters>
          <Typography>{el.label}</Typography>
          <Typography component="span" sx={{ ml: "auto" }}>
            <Currency amount={el.value} />
          </Typography>
        </ListItem>
      ))}
      <ListItem
        key="total"
        disableGutters
        sx={{
          fontWeight: 500,
          borderTop: (theme) => `1px solid ${theme.palette.grey[400]}`,
        }}
      >
        <Typography>Gesamtbetrag</Typography>
        <Typography component="span" sx={{ ml: "auto" }}>
          <Currency amount={total} />
        </Typography>
      </ListItem>
    </List>
  );
}
