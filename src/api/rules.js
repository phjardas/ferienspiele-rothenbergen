export const isTeamUser = ({ user }) => user && user.hasAnyRole('office', 'kuchen');
export const isOfficeUser = ({ user }) => user && user.hasAnyRole('office');
export const isKuchenUser = ({ user }) => user && user.hasAnyRole('kuchen');
