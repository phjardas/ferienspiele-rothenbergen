import { CircularProgress, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Cake as CakeIcon } from '@material-ui/icons';
import { TextField } from 'final-form-material-ui';
import React, { useEffect, useState } from 'react';
import { Field } from 'react-final-form';
import config from '../../api/config';
import Alert from '../Alert';
import Date from '../Date';
import Condition from '../form/Condition';
import FieldSet from '../form/FieldSet';
import Radios from '../form/Radios';
import { required } from '../form/validation';

function isKuchenSelected(date) {
  return date && date !== 'none' && date !== 'geschwister';
}

function KuchenDate({ value }) {
  return <Date value={value} weekday="long" day="numeric" month="long" />;
}

function KuchenInfo({ date, loading, error, data }) {
  if (loading) return <CircularProgress />;
  if (error) return <Alert color="error">{error.message}</Alert>;

  const kuchen = data[date];
  if (!kuchen || !kuchen.length) return null;
  return (
    <>
      <Typography>
        Wir haben schon Zusagen für folgende Kuchen am <KuchenDate value={date} />:
      </Typography>
      <List dense>
        {kuchen.sort().map((k, i) => (
          <ListItem key={i}>
            <ListItemText primary={k} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default function Kuchen() {
  const [kuchen, setKuchen] = useState({ loading: true });

  async function loadKuchen() {
    try {
      setKuchen({ loading: true });

      // FIXME load Kuchen from API
      setTimeout(
        () =>
          setKuchen({
            loading: false,
            data: {
              '2019-07-01': ['Testkuchen', 'Ein komischer anderer Kuchen', 'Igitt-Igitt-Kuchen'],
            },
          }),
        2000
      );
    } catch (error) {
      setKuchen({ loading: false, error });
    }
  }

  useEffect(() => {
    loadKuchen();
  }, []);

  return (
    <FieldSet icon={<CakeIcon />} title="Kuchen">
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography>
            Um die Ferienspiele lecker und abwechslungsreich zu gestalten, sind auch Sie gefragt! Wir benötigen insgesamt über 50 Kuchen von
            den Eltern. Damit wir gut planen können, bitten wir Sie hier um Ihren Eintrag. Vielen Dank!
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Radios
            name="kuchen.date"
            required
            options={[
              ...config.kuchen.map(({ date }) => ({
                value: date,
                label: (
                  <>
                    Ich bringe am{' '}
                    <strong>
                      <KuchenDate value={date} />
                    </strong>{' '}
                    einen Kuchen mit.
                  </>
                ),
              })),
              { value: 'none', label: `Ich kann leider an keinem der Tage einen Kuchen mitbringen. (zzgl. € ${config.prices.noCake})` },
              { value: 'geschwister', label: 'Ich bringe bereits für ein Geschwisterkind einen Kuchen mit.' },
            ]}
          />
        </Grid>

        <Condition when="kuchen.date" is={isKuchenSelected}>
          {date => (
            <>
              <Grid item xs={12} lg={6}>
                <Field
                  name="kuchen.name"
                  component={TextField}
                  label="Name des Kuchens"
                  required
                  fullWidth
                  validate={required}
                  helperText="Bitte bringen Sie nur halbwegs trockene Rührkuchen mit, keine Torten oder Kuchen mit Sahne."
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <KuchenInfo date={date} {...kuchen} />
              </Grid>
            </>
          )}
        </Condition>
      </Grid>
    </FieldSet>
  );
}
