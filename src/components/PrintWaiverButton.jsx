import { Button as LoadingButton } from "@mui/material";
import { useState } from "react";
import { createWaiver } from "../api/waiver";

export default function PrintWaiverButton({ registration, ...rest }) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const blob = await (await createWaiver(registration.id)).blob();
      downloadWaiver(registration, blob);
      setLoading(false);
    } catch (error) {
      console.error("Error printing waiver:", error);
      alert(
        "Beim Drucken der Einverständniserklärung ist leider ein Fehler aufgetreten.",
      );
      setLoading(false);
    }
  };

  return <LoadingButton loading={loading} onClick={onClick} {...rest} />;
}

function downloadWaiver(registration, blob) {
  const { document } = window;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Einverständniserklärung ${registration.child.firstName} ${registration.child.lastName}.pdf`;
  a.type = blob.type;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
