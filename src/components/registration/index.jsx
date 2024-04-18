import Registration from "./Registration";
import RegistrationStatus from "./RegistrationStatus";

export default function RegistrationWrapper({ code, ...props }) {
  return (
    <RegistrationStatus code={code}>
      <Registration {...props} />
    </RegistrationStatus>
  );
}
