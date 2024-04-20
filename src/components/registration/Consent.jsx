import { Grid, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { Field } from "react-final-form";
import Datenschutz from "../Datenschutz";
import Modal from "../Modal";
import Teilnahmebedingungen from "../Teilnahmebedingungen";
import Checkbox from "../form/Checkbox";
import FieldSet from "../form/FieldSet";

function ConsentCheckbox({ name, info, modalTitle, modalContent, ...props }) {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const onClick = (e) => {
    e.preventDefault();
    openDialog();
  };

  const Info = info;
  const ModalContent = modalContent;

  return (
    <>
      <Modal
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={closeDialog}
        title={modalTitle}
      >
        <ModalContent />
      </Modal>
      {Info && (
        <Typography>
          <Info onClick={onClick} />
        </Typography>
      )}
      <Field name={name} component={Checkbox} type="checkbox" {...props} />
    </>
  );
}

export default function Consent() {
  return (
    <FieldSet>
      <Grid container spacing={2}>
        <Grid item>
          <ConsentCheckbox
            name="consent.teilnahmebedingungen"
            info={({ onClick }) => (
              <>
                Bitte lesen Sie die{" "}
                <Link href="/teilnahmebedingungen" onClick={onClick}>
                  Teilnahmebedingungen
                </Link>
                .
              </>
            )}
            modalTitle="Teilnahmebedingungen"
            modalContent={Teilnahmebedingungen}
            label="Ich habe die Teilnahmebedingungen gelesen und akzeptiere sie."
            required
            validate={(checked) =>
              !checked &&
              "Bitte bestätigen Sie, dass Sie die Teilnahmebedingungen akzeptieren."
            }
          />
        </Grid>
        <Grid item>
          <ConsentCheckbox
            name="consent.datenschutz"
            info={({ onClick }) => (
              <>
                Bitte lesen Sie die{" "}
                <Link href="/datenschutz" onClick={onClick}>
                  Datenschutzerklärung
                </Link>
                .
              </>
            )}
            modalTitle="Datenschutzerklärung"
            modalContent={Datenschutz}
            label="Ich habe die Datenschutzerklärung zur Kenntnis genommen."
            required
            validate={(checked) =>
              !checked &&
              "Bitte bestätigen Sie, dass Sie die Datenschutzerklärung zur Kenntnis genommen haben."
            }
          />
        </Grid>
      </Grid>
    </FieldSet>
  );
}
