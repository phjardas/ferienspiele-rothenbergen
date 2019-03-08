import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, withStyles, Typography } from '@material-ui/core';
import { Check as CheckIcon, Clear as MissingIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { getRegistrations } from '../../api/firestore';
import { useRouter } from '../../api/router';
import Alert from '../Alert';
import Date from '../Date';
import Age from '../Age';
import GlobalLoader from '../GlobalLoader';
import GenderIcon from '../GenderIcon';
import LabelIcon from '../LabelIcon';

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
    label: 'Einverständnis',
  },
  {
    label: 'Bezahlung',
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

  return (
    <>
      <Typography paragraph>
        Es gibt insgesamt <strong>{registrations.length} Anmeldungen</strong>.
      </Typography>
      <Table padding="dense">
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
                {reg.waiver && reg.waiver.receivedAt ? (
                  <LabelIcon icon={CheckIcon} label={<Date value={reg.waiver.receivedAt} />} />
                ) : (
                  <LabelIcon icon={MissingIcon} label="fehlt" />
                )}
              </TableCell>
              <TableCell>
                {reg.payment && reg.payment.receivedAt ? (
                  <LabelIcon icon={CheckIcon} label={<Date value={reg.payment.receivedAt} />} />
                ) : (
                  <LabelIcon icon={MissingIcon} label="fehlt" />
                )}
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
