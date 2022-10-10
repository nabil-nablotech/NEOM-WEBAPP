import React, { Component } from "react";
import styles from "./index.module.css";
import { Box } from "@mui/material";
import Logo from "../../pages/UserManagement/img/Logo.svg";
import UserMenuComponent from "./../UserMenu/index";
import { useNavigate } from "react-router-dom";

interface IHeader {
}

const Header = (props: IHeader) => {
  const navigate = useNavigate();

  return (
    <Box className={`${styles["header-container"]}`}>
      <Box className={`${styles["logo"]}`}>
        <Box component="img" alt="NEOM logo" src={Logo}  onClick={() => navigate("/")} />
      </Box>
      <UserMenuComponent />
    </Box>
  );
};

export default Header;
