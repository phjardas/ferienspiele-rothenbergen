import config from "../api/config";

export default function Age({ dateOfBirth }) {
  if (!dateOfBirth) return null;
  if (
    typeof dateOfBirth !== "string" &&
    "seconds" in dateOfBirth &&
    "nanoseconds" in dateOfBirth
  )
    dateOfBirth = new Date(dateOfBirth.seconds * 1000);
  if (typeof dateOfBirth === "string") dateOfBirth = new Date(dateOfBirth);

  return getAge(dateOfBirth);
}

export function getAge(birthday, ref = config.startDate) {
  var thisYear = 0;

  if (ref.getMonth() < birthday.getMonth()) {
    thisYear = 1;
  } else if (
    ref.getMonth() === birthday.getMonth() &&
    ref.getDate() < birthday.getDate()
  ) {
    thisYear = 1;
  }

  return ref.getFullYear() - birthday.getFullYear() - thisYear;
}
