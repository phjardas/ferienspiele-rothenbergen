import { Card, CardHeader, LinearProgress, Link, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import Date from '../Date';

export default function KuchenStatistics({ date, required, actual }) {
  return (
    <Card>
      <CardHeader title={<Date value={date} />} subheader={`${actual.length} von ${required} Kuchen`} />
      <LinearProgress variant="determinate" value={(actual.length / required) * 100} />
      {actual.length > 0 && (
        <List>
          {actual
            .sort((a, b) => a.kuchen.name.localeCompare(b.kuchen.name))
            .map((reg) => (
              <ListItem key={reg.id}>
                <ListItemText
                  primary={reg.kuchen.name}
                  secondary={
                    <>
                      {reg.child.firstName} {reg.child.lastName}
                      <br />
                      <Link href={`tel:${reg.parent.phone}`}>{reg.parent.phone}</Link>
                      <br />
                      <Link href={`mailto:${reg.parent.email}`}>{reg.parent.email}</Link>
                    </>
                  }
                />
              </ListItem>
            ))}
        </List>
      )}
    </Card>
  );
}
