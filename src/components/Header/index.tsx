import React, { useState } from "react";
import { Box } from "@mui/material";
import styles from "./index.module.css";
import Logo from "../../pages/UserManagement/img/Logo.svg";
import UserMenuComponent from "./../UserMenu/index";
import { useNavigate } from "react-router-dom";
import CustomSearchField from "../SearchField";

interface IHeader {
  showSearch?: boolean
  showRefinedSearch?: boolean
  screen?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Header = (props: IHeader) => {

  const {
    showSearch = false,
    screen,
    onKeyDown
  } = props
  const navigate = useNavigate();

  return (
    <>
      {screen === "landing" ?
        <>
          <Box component="div" sx={{
            position: 'absolute',
            top: '3%',
            right: '0'
          }}>
            <UserMenuComponent />
          </Box>
        </>
        :
        <Box component="div" className={`${styles["header-container"]}`}>
          <Box component="div" className={`${styles["header-lhs-content"]}`}>
            <Box component="div" className={`${styles["logo"]}`}>
              <Box component="img" alt="NEOM logo" src={Logo} onClick={() => navigate("/")} />
            </Box>
            {
              showSearch &&
              <CustomSearchField
                onKeyDown={onKeyDown}
                className={`${styles["header-search"]}`}
              />
            }
            <UserMenuComponent />
          </Box>
        </Box>}
    </>
  );
};

export default Header;
