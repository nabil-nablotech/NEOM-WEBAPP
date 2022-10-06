import { useQuery, useMutation, useQueryClient } from "react-query";
import { User, UserPayload, UserModalstate, ISnackbar } from "../types/User";
import client from '../utils/services/axiosClient';
import { useDispatch } from "react-redux";
import { useState } from "react";

const useUser = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalState, setModalState] = useState<UserModalstate>({ visible: false, editing: null });
  const [showSnackbar, setShowSnackbar] = useState<ISnackbar>({ open: false, message: '' });
  // Access the client
  const queryClient = useQueryClient();

  const fetchUser = (): Promise<User[]> => client.get<User[]>('/api/users?populate=*').then(response => response.data)
  const postUser = (payload: UserPayload): Promise<User[]> => client.post('/api/users', payload).then(response => response.data)
  const editUser = (payload: UserPayload): Promise<User> => client.put(`/api/users/${userData?.id}`, payload).then(response => response.data)

  // query
  const query = useQuery(['users'], fetchUser, {
    // retry: false,
    // enabled: false
  });

   // Mutations
  const {mutate: postUserMutation} = useMutation(postUser, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['users']);
      setConfirmLoading(false);
      setModalState({
        visible: false,
        editing: null
      })
      setShowSnackbar({
        open: true,
        message: 'User addedd'
      });
    },
    onError: () => {
      setConfirmLoading(false);
    }
  })
  
  const {mutate: editUserMutation, data: updatedUser} = useMutation(editUser, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['users']);
      setConfirmLoading(false);
      setModalState({
        visible: false,
        editing: null
      });
      setShowSnackbar({
        open: true,
        message: 'User updated'
      });
    },
    onError: () => {
      setConfirmLoading(false);
    }
  })

  const handleUser = (user: User | null) => {
    setUserData(user);
  };

  const handleSnackbar = () => {
    setShowSnackbar({
      open: false,
      message: ''
    });
  }
  
  return {
    query,
    postUserMutation,
    editUserMutation,
    showModal,
    setShowModal,
    handleUser,
    userData,
    setConfirmLoading,
    confirmLoading,
    updatedUser,
    setModalState,
    modalState,
    handleSnackbar,
    showSnackbar
  };
};

export default useUser;
