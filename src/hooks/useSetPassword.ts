import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {resetPassword} from '../api/setPassword';
import dayjs from "dayjs";
import { useQuery, useMutation } from 'react-query';
import { ISnackbar } from '../types/User';
import useAlert from './useAlert';

const useSetPassword = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const {handleAlert} = useAlert();
  function decryptUser(str: string) {
    return decodeURIComponent(window.atob(str));
  }

  const getUserDetails = () => {
    const key = location.search.replace('?key=', '');
    try {
      
      const user = JSON.parse(decryptUser(key));
      
      if (dayjs().isBefore(user.exp)) {
        navigate('/set-password');
      } else {
        handleAlert('Link expired', 'error')
        navigate('/');
      }
      return user;
    } catch (error) {
      handleAlert('Invalid Link', 'error')
      navigate('/');
    }
  }

  const query = useQuery(['setPassword'], getUserDetails, {
    retry: false
  });

  const {mutate: resetPasswordMutation} = useMutation(['resetPassword'], resetPassword, {
    onSuccess: () => {
      navigate('/');
    },
    onError: () => {
      handleAlert('Error Occured', 'error')
      navigate('/');
    }
  })
  

  return {
    query,
    resetPasswordMutation
  };
};

export default useSetPassword;
