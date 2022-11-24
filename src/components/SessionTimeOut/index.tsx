
import { useState, useEffect } from 'react';
import { addEventListeners,  removeEventListeners } from './sessionTimeOutUtil'
import useLogout from "../../hooks/useLogout";

const SessionTimeOut = () => {
    const { clientLogout } = useLogout();
    const [isWarningModalOpen, setWarningModalOpen] = useState(false);
  useEffect(() => {
    const createTimeout1 = () => setTimeout(()=>{ 
      setWarningModalOpen(true);
    },5000)

    const createTimeout2 = () => setTimeout(() => {
        clientLogout();
    },600000)

    const listener = () => {
      if(!isWarningModalOpen){
        clearTimeout(timeout)
        timeout = createTimeout1();
      }
    } 

    // Initialization
    let timeout = isWarningModalOpen  ? createTimeout2() : createTimeout1()
    addEventListeners(listener);

    // Cleanup
    return () => {
      removeEventListeners(listener);
      clearTimeout(timeout);
    }
  },[isWarningModalOpen])
  return (
    <>
    </>
  );
};

export default SessionTimeOut;
