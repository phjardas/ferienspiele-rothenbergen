import { EuroSymbol as EuroIcon } from "@mui/icons-material";
import React from "react";
import Condition from "../form/Condition";
import FieldSet from "../form/FieldSet";
import PriceTable from "./PriceTable";

export default function Price() {
  return (
    <Condition when="price" is={(p) => !!p}>
      {(price) => (
        <FieldSet icon={<EuroIcon />} title="Teilnahmebeitrag">
          <PriceTable price={price} />
        </FieldSet>
      )}
    </Condition>
  );
}
