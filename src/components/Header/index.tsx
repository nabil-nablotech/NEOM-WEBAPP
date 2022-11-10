import React, { useState } from "react";
import { Box } from "@mui/material";
import styles from "./index.module.css";
import Logo from "../../pages/UserManagement/img/Logo.svg";
import UserMenuComponent from "./../UserMenu/index";
import { useNavigate } from "react-router-dom";
import CustomSearchField from "../SearchField";
import { ConfirmationModal } from "../ConfirmationModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleDeleteUserSuccess, toggleDeleteUserWindowOpen } from "../../store/reducers/searchResultsReducer";
import { useDispatch } from "react-redux";
import PositionedSnackbar from "../Snackbar";

interface IHeader {
  showSearch?: boolean
  showRefinedSearch?: boolean
  screen?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleClearSearchText?: () => void
  handleLogo?: () => void
}

const Header = (props: IHeader) => {

  const {
    showSearch = false,
    screen,
    onKeyDown,
    handleClearSearchText,
    handleLogo
  } = props
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isDeleteUserWindowOpen, deleteUserSuccess } = useSelector((state: RootState) => state.searchResults);

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
              <Box component="img" alt="NEOM logo" src={Logo} onClick={handleLogo} />
            </Box>
            {
              showSearch &&
              <CustomSearchField
                onKeyDown={onKeyDown}
                handleClearSearchText={handleClearSearchText}
                className={`${styles["header-search"]}`}
              />
            }
            <UserMenuComponent />
          </Box>
        </Box>}
      <ConfirmationModal
        type={"confirm-delete-user"}
        open={isDeleteUserWindowOpen?.flag}
        handleClose={() => {
            dispatch(toggleDeleteUserWindowOpen({
              flag: false
            }))
        }}
        handleDelete={
          () => {
            dispatch(toggleDeleteUserSuccess(true))
          }
        }
      />
      <PositionedSnackbar
        message={`User deleted`}
        severity={"success"}
        open={deleteUserSuccess}
        handleClose={() => {
          dispatch(toggleDeleteUserSuccess(false))
          dispatch(toggleDeleteUserWindowOpen({
            flag: false,
            mailId: ''
          }))
        }}
        duration={5000}
      />
    </>
  );
};

export default Header;
