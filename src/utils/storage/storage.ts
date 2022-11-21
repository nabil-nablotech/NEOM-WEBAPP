const TOKEN = 'token';
const UID = 'UID';
const ROLE = 'role';
const RESETLINK = 'reset';
/**
 * Handles setting and getting data from localStorage
 */
export const getToken = () => localStorage.getItem(TOKEN) || null;
export const getId = () => localStorage.getItem(UID) || null;
export const getRole = () => localStorage.getItem(ROLE) || null;
export const getResetLink = () => localStorage.getItem(RESETLINK) || null;

// remove the token and user from the session storage
export const removeSession = async () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(UID);
  localStorage.removeItem(ROLE);
};

// set the token and user on the session storage
export const setSession = (token: string, uid: string) => {
  localStorage.setItem(TOKEN, `${token}`);
  localStorage.setItem(UID, uid);
};

// set the role on the session storage
export const setRole = (role: string) => {
  localStorage.setItem(ROLE, role);
};

// set the resetPassword on the session storage
export const setResetLink = (str: string) => {
  localStorage.setItem(RESETLINK, str);
};
