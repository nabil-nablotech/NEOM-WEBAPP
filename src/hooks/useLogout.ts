import { User } from "../types/User";
import client from '../utils/services/axiosClient';
import {removeSession, getId} from '../utils/storage/storage';

const useLogout = () => {

  /**
   * get user session details
   */
  const logout = async () => {
    const id = getId();
    try {
      const payload = {}
      const {data} = await client.put<User>(`/api/users/${id}`, JSON.stringify(payload));
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
