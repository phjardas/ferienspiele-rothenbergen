import { CardHeader, Grid, Link, List, ListItem, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import config from '../../api/config';
import { getRegistrations } from '../../api/firestore';
import Alert from '../Alert';
import Card from '../Card';
import GlobalLoader from '../GlobalLoader';
import KuchenStatistics from './KuchenStatistics';

export default function Kuchen() {
  const [{ loading, error, registrations }, setState] = useState({ loading: true });

  useEffect(() => getRegistrations({}, (error, registrations) => setState({ error, registrations })), []);

  if (loading) return <GlobalLoader noLayout />;
  if (error) return <Alert color="error">{error.message}</Alert>;

  const byDate = registrations.reduce((acc, reg) => ({ ...acc, [reg.kuchen.date]: [...(acc[reg.kuchen.date] || []), reg] }), {});

  return (
    <Grid container spacing={2}>
      {config.kuchen.map((req) => (
        <Grid key={req.date} item xs={12}>
          <KuchenStatistics date={req.date} required={req.amount} actual={byDate[req.date] || []} />
        </Grid>
      ))}
      {'none' in byDate && (
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Kein Kuchen" />
            <List>
              {byDate.none.map((reg) => (
                <ListItem key={reg.id}>
                  <ListItemText
                    primary={`${reg.child.firstName} ${reg.child.lastName}`}
                    secondary={
                      <>
                        <Link href={`tel:${reg.parent.phone}`}>{reg.parent.phone}</Link>
                        <br />
                        <Link href={`mailto:${reg.parent.email}`}>{reg.parent.email}</Link>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}
