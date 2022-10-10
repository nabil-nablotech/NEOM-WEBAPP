import { Container } from "@mui/material";
import React, { Component } from "react";
import Header from "../../components/Header";
import UserMenuComponent from "../../components/UserMenu/index";
// import UserMenuComponent from './../../components/UserMenu/index';
import styles from "./index.module.css";
import Snackbar from "../../components/Snackbar";
import { UserManagementTable } from "../../components/UserManagementTable";
import useUser from "../../hooks/useUser";

const UserManagement = () => {
  const {
    query,
    showModal,
    handleUser,
    userData,
    editUserMutation,
    postUserMutation,
    setConfirmLoading,
    confirmLoading,
    updatedUser,
    setModalState,
    modalState,
    handleSnackbar,
    showSnackbar,
    userRoles,
    copyLink,
    generateLink,
    selectedUserLink
  } = useUser();
  
  const { data, isLoading } = query;

  return (
    <>
      <div>
        <Header/>
        <UserMenuComponent />
        <div className={`${styles["content-section"]}`}>
          <Container maxWidth="xl">
            {/* <div className={`${styles['title']}`}>USERS</div>
                        <Button label="SIGN IN" /> */}
            <UserManagementTable
              isLoading={isLoading}
              data={data || []}
              handleUser={handleUser}
              editUser={editUserMutation}
              postUser={postUserMutation}
              userData={userData}
              setConfirmLoading={setConfirmLoading}
              confirmLoading={confirmLoading}
              updatedUser={updatedUser}
              setModalState={setModalState}
              modalState={modalState}
              userRoles={userRoles}
              copyLink={copyLink}
              generateLink={generateLink}
              selectedUserLink={selectedUserLink}
            />
          </Container>
          <Snackbar
            message={showSnackbar.message}
            open={showSnackbar.open}
            handleClose={handleSnackbar}
          />
        </div>
      </div>
    </>
  );
};

export default UserManagement;
