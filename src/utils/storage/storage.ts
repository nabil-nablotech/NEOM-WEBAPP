const TOKEN = 'token';
const UID = 'UID';
const ROLE = 'role';
/**
 * Handles setting and getting data from sessionStorage
 */
export const getToken = () => sessionStorage.getItem(TOKEN) || null;
export const getId = () => sessionStorage.getItem(UID) || null;
export const getRole = () => sessionStorage.getItem(ROLE) || null;

// remove the token and user from the session storage
export const removeSession = async () => {
  sessionStorage.removeItem(TOKEN);
  sessionStorage.removeItem(UID);
  sessionStorage.removeItem(ROLE);
};

// set the token and user on the session storage
export const setSession = (token: string, uid: string) => {
  sessionStorage.setItem(TOKEN, `Bearer ${token}`);
  sessionStorage.setItem(UID, uid);
};

// set the role on the session storage
export const setRole = (role: string) => {
  sessionStorage.setItem(ROLE, role);
};
