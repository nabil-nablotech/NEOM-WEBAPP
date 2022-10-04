const TOKEN = 'token';
const UID = 'UID';
/**
 * Handles setting and getting data from sessionStorage
 */
export const getToken = () => sessionStorage.getItem(TOKEN) || null;
export const getId = () => sessionStorage.getItem(UID) || null;

// remove the token and user from the session storage
export const removeSession = async () => {
  sessionStorage.removeItem(TOKEN);
  sessionStorage.removeItem(UID);
};

// set the token and user on the session storage
export const setSession = (token: string, uid: string) => {
  sessionStorage.setItem(TOKEN, `Bearer ${token}`);
  sessionStorage.setItem(UID, uid);
};
