import { useQuery, useMutation, useQueryClient } from "react-query";
import { User, UserPayload } from "../types/User";
import client from '../utils/services/axiosClient';
import { useDispatch } from "react-redux";
import { useState } from "react";

const useUser = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [showmodal, setShowModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  // Access the client
  const queryClient = useQueryClient();

  const fetchUser = (): Promise<User[]> => client.get('/api/users', ).then(response => response.data)
  const postUser = (payload: UserPayload): Promise<User[]> => client.post('/api/users', payload).then(response => response.data)
  const editUser = (payload: UserPayload): Promise<User[]> => client.put(`/api/users/${userId}`, payload).then(response => response.data)

  // query
  const query = useQuery(['users', fetchUser]);

   // Mutations
  const postUserMutation = useMutation(postUser, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['users'])
    },
  })
  
  const editUserMutation = useMutation(editUser, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['users'])
      setUserData(null);
    },
  })

  const handleUser = (user: User) => {
    setUserData(user);
  };
  
  return {
    query,
    postUserMutation,
    editUserMutation,
    setUserId,
    showmodal,
    setShowModal,
    handleUser,
    userData
  };
};

export default useUser;
