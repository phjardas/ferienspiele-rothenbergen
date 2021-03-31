import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getRegistrations } from '../../api/firestore';
import { useRouter } from '../../api/router';
import Age from '../Age';
import Alert from '../Alert';
import Date from '../Date';
import GenderIcon from '../GenderIcon';
import GlobalLoader from '../GlobalLoader';
import YesNoLabel from '../YesNoLabel';
import ExportButton from './ExportButton';

const columns = [
  {
    field: ['child', 'lastName'],
    label: 'Nachname',
  },
  {
    field: ['child', 'firstName'],
    label: 'Vorname',
  },
  {
    field: ['child', 'gender'],
    label: 'Geschlecht',
  },
  {
    field: ['child', 'dateOfBirth'],
    label: 'Geburtsdatum',
  },
  {
    field: ['registeredAt'],
    label: 'Registriert',
  },
  {
    field: ['uebernachtung', 'type'],
    label: 'Übernachtung',
  },
  {
    label: 'Bezahlung',
  },
  {
    label: 'Einverst.',
  },
];

function Anmeldungen({ classes }) {
  const { match, history } = useRouter();
  const [{ loading, error, registrations }, setState] = useState({ loading: true });
  const [{ sortColumn, sortDirection }, setSort] = useState({ sortColumn: columns[0], sortDirection: 'asc' });

  useEffect(
    () =>
      getRegistrations({ sortField: sortColumn.field.join('.'), sortDirection }, (error, registrations) =>
        setState({ error, registrations })
      ),
    [sortColumn, sortDirection]
  );

  if (loading) return <GlobalLoader />;
  if (error) return <Alert color="error">{error.message}</Alert>;

  const toggleSort = col => () =>
    setSort(s => {
      const current = col === s.sortColumn;
      return { sortColumn: col, sortDirection: current && s.sortDirection === 'asc' ? 'desc' : 'asc' };
    });

  const openRegistration = reg => history.push(`${match.path}/${reg.id}`);

  const paymentsMissing = registrations.filter(r => !r.payment).length;
  const waiversMissing = registrations.filter(r => !r.waiver).length;

  return (
    <>
      <Typography paragraph>
        Es gibt insgesamt{' '}
        <strong>
          {registrations.length} Anmeldung{registrations.length === 1 ? '' : 'en'}
        </strong>
        . <ExportButton registrations={registrations} />
      </Typography>
      {(paymentsMissing > 0 || waiversMissing > 0) && (
        <Alert color="info" gutterBottom>
          Es {paymentsMissing + waiversMissing === 1 ? 'fehlt' : 'fehlen'} noch{' '}
          {paymentsMissing > 0 && `${paymentsMissing} ${paymentsMissing === 1 ? 'Teilnahmebeitrag' : 'Teilnahmebeiträge'}`}{' '}
          {waiversMissing > 0 &&
            `${paymentsMissing > 0 ? 'und ' : ''}${waiversMissing} ${
              waiversMissing === 1 ? 'Einverständniserklärung' : 'Einverständniserklärungen'
            }`}
          .
        </Alert>
      )}
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell key={i} sortDirection={col === sortColumn ? sortDirection : false}>
                {col.field ? (
                  <TableSortLabel active={col === sortColumn} direction={sortDirection} onClick={toggleSort(col)}>
                    {col.label}
                  </TableSortLabel>
                ) : (
                  col.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {registrations.map(reg => (
            <TableRow key={reg.id} hover onClick={() => openRegistration(reg)} classes={{ hover: classes.rowHover }}>
              <TableCell>{reg.child.lastName}</TableCell>
              <TableCell>{reg.child.firstName}</TableCell>
              <TableCell>
                <GenderIcon gender={reg.child.gender} label />
              </TableCell>
              <TableCell>
                <Date value={reg.child.dateOfBirth} /> (<Age dateOfBirth={reg.child.dateOfBirth} /> J.)
              </TableCell>
              <TableCell>
                <Date value={reg.registeredAt} />
              </TableCell>
              <TableCell>
                <YesNoLabel value={reg.uebernachtung.type === 'uebernachtung'} />
              </TableCell>
              <TableCell>
                <YesNoLabel value={reg.payment && reg.payment.receivedAt} noColor="error" />
              </TableCell>
              <TableCell>
                <YesNoLabel value={reg.waiver && reg.waiver.receivedAt} noColor="error" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

const styles = {
  rowHover: {
    cursor: 'pointer',
  },
};

export default withStyles(styles)(Anmeldungen);
