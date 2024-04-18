import Registration from "./Registration";
import RegistrationStatus from "./RegistrationStatus";

export default function RegistrationWrapper(props) {
  return (
    <RegistrationStatus>
      <Registration {...props} />
    </RegistrationStatus>
  );
}
