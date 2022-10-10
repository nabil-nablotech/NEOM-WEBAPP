import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {resetPassword} from '../api/setPassword';
import dayjs from "dayjs";
import { useQuery, useMutation } from 'react-query';
import { ISnackbar, User } from '../types/User';
import useAlert from './useAlert';
import { ResetPaswordStateInput } from '../types/Login';
import useLogin from './useLogin';

const useSetPassword = () => {
  const [state, setState] = useState<ResetPaswordStateInput>({
    confirmPassword: "",
    password: "",
  });
  const [data, setData] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const {handleAlert} = useAlert();
  const {clientLogin} = useLogin();
  function decryptUser(str: string) {
    return decodeURIComponent(window.atob(str));
  }

  const getUserDetails = () => {
    const key = location.search.replace('?key=', '');
    try {
      
      const user = JSON.parse(decryptUser(key));
      if (dayjs().isBefore(user.exp)) {
        setData(user);
        navigate('/set-password');
      } else {
        handleAlert('Link expired', 'error')
        navigate('/');
      }
      return user;
    } catch (error) {
      console.log('error', error);
      handleAlert('Invalid Link', 'error')
      handleAlert('Please contact your administrator', 'info');
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])


  const {mutate: resetPasswordMutation} = useMutation(['resetPassword'], resetPassword, {
    onSuccess: async (data: User) => {
      await clientLogin({identifier: data.email, password: state.password});
      await navigate('/');
    },
    onError: () => {
      handleAlert('Error Occured', 'error')
      navigate('/');
    }
  })
  

  return {
    query: {data},
    resetPasswordMutation,
    setState,
    state
  };
};

export default useSetPassword;
