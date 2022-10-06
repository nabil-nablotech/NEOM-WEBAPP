import { Container } from "@mui/material";
import React, { Component } from "react";
import Header from "../../components/Header";
import UserMenuComponent from "../../components/UserMenu/index";
import { useNavigate } from "react-router-dom";
// import UserMenuComponent from './../../components/UserMenu/index';
import styles from "./index.module.css";
import Button from "../../components/Button";
import {UserManagementTable} from "../../components/UserManagementTable";
import useUser from "../../hooks/useUser";

const UserManagement = () => {
  const navigate = useNavigate();
  const { query, showModal, handleUser, userData, editUserMutation } = useUser();
  const { data, isLoading } = query;

  return (
    <>
      <div>
        <Header onClick={() => navigate("/")} />
        <UserMenuComponent />
        <div className={`${styles["content-section"]}`}>
          <Container maxWidth="xl">
            {/* <div className={`${styles['title']}`}>USERS</div>
                        <Button label="SIGN IN" /> */}
            <UserManagementTable data={data} showModal={showModal} handleUser={handleUser} editUser={editUserMutation} userData={userData} />
          </Container>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
