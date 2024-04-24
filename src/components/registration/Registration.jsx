import { Box } from "@mui/material";
import { FORM_ERROR } from "final-form";
import { useCallback, useMemo, useState } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router";
import { storeRegistration } from "../../api/firestore";
import { createTestData } from "../../api/testdata";
import Actions from "./Actions";
import Child from "./Child";
import Consent from "./Consent";
import EmergencyContact from "./EmergencyContact";
import Fruehbetreuung from "./Fruehbetreuung";
import Kuchen from "./Kuchen";
import Parents from "./Parents";
import Price from "./Price";
import Welcome from "./Welcome";
import { priceCalculator, withPrice } from "./priceCalculator";

const emptyValues = {
  child: {},
  parent: {},
  emergencyContact: {},
  uebernachtung: {},
  kuchen: {},
};

const enableTestData = import.meta.env.DEV;
const createInitialValues = enableTestData ? createTestData : () => emptyValues;
const decorators = [priceCalculator];

export default function Registration({ code, initialValues: originalValues }) {
  const [initialValues, setInitialValues] = useState(
    withPrice(
      originalValues && Object.keys(originalValues).length
        ? originalValues
        : createInitialValues(),
    ),
  );
  const updateTestData = useMemo(
    () => enableTestData && (() => setInitialValues(createInitialValues())),
    [],
  );

  const navigate = useNavigate();

  const submit = useCallback(
    async (data) => {
      try {
        const result = await storeRegistration(data, code);
        navigate(`/anmeldung/${result.id}`);
      } catch (error) {
        console.warn("Error submitting registration:", error);
        return { [FORM_ERROR]: error.message };
      }
    },
    [navigate, code],
  );

  return (
    <Form
      onSubmit={submit}
      initialValues={initialValues}
      decorators={decorators}
    >
      {({ handleSubmit, invalid, submitting, submitError }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Welcome
              createTestData={updateTestData}
              geschwisterkind={
                originalValues && Object.keys(originalValues).length > 0
              }
            />
            <Child />
            <Parents />
            <EmergencyContact />
            <Fruehbetreuung />
            <Kuchen />
            <Price />
            <Consent />
          </Box>
          <Actions
            invalid={invalid}
            submitting={submitting}
            submitError={submitError}
          />
        </form>
      )}
    </Form>
  );
}
