import { Button, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, Typography, withStyles } from '@material-ui/core';
import { EuroSymbol as EuroIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import Alert from '../Alert';
import PriceTable from '../registration/PriceTable';

function PriceInfo({ child, price, classes }) {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded(e => !e);

  return (
    <Card>
      <CardHeader avatar={<EuroIcon />} title="Teilnahmebeitrag" />
      <CardContent>
        <Alert color="error">Sie haben den Teilnahmebeitrag noch nicht bezahlt.</Alert>
      </CardContent>
      <CardContent>
        <PriceTable price={price} />
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <Button color="primary" onClick={toggle}>
          Jetzt bezahlen
        </Button>
        <IconButton
          className={`${classes.expand} ${expanded ? classes.expandOpen : ''}`}
          onClick={toggle}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Bitte überweisen Sie den Betrag auf das folgende Konto:</Typography>
          <Typography paragraph>
            Empfänger: EmK Rothenbergen
            <br />
            IBAN: DE38507500940027050992 <br />
            BIC: HELADEF1GEL <br />
            Verwendungszweck: "Ferienspiele {child.firstName} {child.lastName}"
          </Typography>
          <Typography paragraph>Sie können den Teilnahmebeitrag in bar bezahlen:</Typography>
          <Typography paragraph>
            Büro der Katholischen Kirche "Christkönig"
            <br />
            Niedergründauer Straße 20 <br />
            63584 Rothenbergen
          </Typography>
          <Typography paragraph>
            Sie können das Geld und die Einverstädniserklärung auch im Sekretariat der Anton Calaminus Schule in Rothenbergen abgeben.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const styles = ({ transitions }) => ({
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: transitions.create('transform', {
      duration: transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

export default withStyles(styles)(PriceInfo);
