import React, { Component } from "react";
import styles from "./index.module.css";
import { Box } from "@mui/material";
import Logo from "../../pages/UserManagement/img/Logo.svg";
import UserMenuComponent from "./../UserMenu/index";
import { useNavigate } from "react-router-dom";
import CustomSearchField from "../SearchField";

interface IHeader {
  showSearch?: boolean
}

const Header = (props: IHeader) => {

  const {
    showSearch = false
  } = props
  const navigate = useNavigate();

  return (
    <Box className={`${styles["header-container"]}`}>
      <Box className={`${styles["header-lhs-content"]}`}>
        <Box className={`${styles["logo"]}`}>
          <Box component="img" alt="NEOM logo" src={Logo}  onClick={() => navigate("/")} />
        </Box>
        {
          showSearch &&
          <CustomSearchField
            className={`${styles["header-search"]}`}
          />
        }
        <UserMenuComponent />
      </Box>
    </Box>
  );
};

export default Header;
