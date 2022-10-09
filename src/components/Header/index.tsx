import React, { Component } from "react";
import styles from "./index.module.css";
import { Box } from "@mui/material";
import Logo from "../../pages/UserManagement/img/Logo.svg";
import UserMenuComponent from "./../UserMenu/index";

interface IHeader {
  onClick: () => void;
}

const Header = (props: IHeader) => {
  const { onClick } = props;
  return (
    <Box className={`${styles["header-container"]}`}>
      <Box className={`${styles["logo"]}`}>
        <Box onClick={onClick} component="img" alt="NEOM logo" src={Logo} />
      </Box>
      <UserMenuComponent />
    </Box>
  );
};

export default Header;
