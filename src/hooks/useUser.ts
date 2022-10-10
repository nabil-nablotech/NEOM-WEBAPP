import { useMutation, useQueryClient, useQueries } from "react-query";
import dayjs from "dayjs";
import {
  User,
  UserPayload,
  UserModalstate,
  ISnackbar,
  Roles,
} from "../types/User";
import { LinkGenerate } from "../types/UserManagement";
import client from "../utils/services/axiosClient";
import { useState } from "react";
import { copyToClipboard, webUrl } from "../utils/services/helpers";
import { fetchUser, fetchUserRole, postUser, editUser } from "../api/user";

const useUser = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [recoveryLink, setRecoveryLink] = useState<string>("");
  const [selectedUserLink, setSelectedUserLink] = useState<{
    user: User;
    recovery: boolean;
  } | null>(null);
  const [modalState, setModalState] = useState<UserModalstate>({
    visible: false,
    editing: null,
  });
  const [showSnackbar, setShowSnackbar] = useState<ISnackbar>({
    open: false,
    message: "",
  });
  // Access the client
  const queryClient = useQueryClient();

  // query
  const [query, { data: userRoles }] = useQueries([
    { queryKey: ["users"], queryFn: fetchUser, },
    { queryKey: ["roles"], queryFn: fetchUserRole },
  ]);

  // Mutations
  const { mutate: postUserMutation, data: newUser } = useMutation(postUser, {
    onSuccess: (data: User) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["users"]);
      setConfirmLoading(false);
      setModalState({
        visible: false,
        editing: null,
      });
      setShowSnackbar({
        open: true,
        message: "New user added",
      });
      generateLink({ user: data, recovery: false });
    },
    onError: () => {
      setConfirmLoading(false);
    },
  });

  const { mutate: editUserMutation, data: updatedUser } = useMutation(['editUser'],
    editUser,
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["users"]);
        setConfirmLoading(false);
        setModalState({
          visible: false,
          editing: null,
        });
        setShowSnackbar({
          open: true,
          message: "User updated",
        });
      },
      onError: () => {
        setConfirmLoading(false);
      },
    }
  );

  const handleUser = (user: User | null) => {
    setUserData(user);
  };

  const handleSnackbar = () => {
    setShowSnackbar({
      open: false,
      message: "",
    });
  };

  /**
   * encrypt the user details into base64
   */
  const encryptUser = (str: string) => {
    return window.btoa(encodeURIComponent(str));
  };

  /**
   * Generate link with encrypted userdata
   */
  const generateLink = async (userData: LinkGenerate) => {
    const expDate = dayjs().add(30, "d").toDate();
    const user = JSON.stringify({
      identifier: userData.user.email,
      id: userData.user.id,
      exp: expDate,
    });
    const token = encryptUser(user);
    const link = `${webUrl}/set-password?key=${token}`;
    setRecoveryLink(link);
    setShowSnackbar({
      open: true,
      message: "Password recovery link created",
    });
    setSelectedUserLink(userData);
    await setUserData(userData.user);
    await editUser({
      user: {recoveryToken: token},
      id: userData.user.id
    });
    handleUser(null);
  };

  /**
   * copy recovery link
   */
  const copyLink = () => {
    copyToClipboard(recoveryLink);
    setShowSnackbar({
      open: true,
      message: "Password recovery link copied",
    });
  };

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
    showSnackbar,
    userRoles,
    generateLink,
    copyLink,
    selectedUserLink,
  };
};

export default useUser;
