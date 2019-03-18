export const isOfficeUser = ({ user }) => user && user.hasAnyRole('office');
export const isAnmeldungUser = ({ user }) => user && user.hasAnyRole('anmeldungen');
export const isKuchenUser = ({ user }) => user && user.hasAnyRole('kuchen');
