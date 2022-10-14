import {removeSession, getId} from '../utils/storage/storage';
import { editUser } from "../api/user";

const useLogout = () => {

  /**
   * get user session details
   */
  const logout = async () => {
    const id = getId();
    try {
      const data = editUser({user: {}, id: Number(id)});
      return data;
    } catch (error) {
      // console.log('error', error)
    }
  }

  /**
   * Logout of the user
   */
  const clientLogout = async () => {
    await logout();
    await removeSession();
    window.location.reload();
  }


  return {
    clientLogout
  };
};

export default useLogout;
