import { useState, useEffect } from 'react';
import { addEventListeners,  removeEventListeners } from './sessionTimeOutUtil'
import useLogout from "../../hooks/useLogout";

const SessionTimeOut = () => {
    const { clientLogout } = useLogout();
    const [timeOutStatus, setTimeOutStatus] = useState(false);
  useEffect(() => {
    let timeout = setTimeout(() => {
        clientLogout();
    },600000)

    const listener = () => {
      setTimeOutStatus(!timeOutStatus);
      clearTimeout(timeout);
    } 
    // Initialization
    addEventListeners(listener);
    // Cleanup
    return () => {
      removeEventListeners(listener);
      clearTimeout(timeout);
    }
  },[timeOutStatus])
  return (
    <>
    </>
  );
};

export default SessionTimeOut;

