import React, { useState } from "react";
import styles from "./index.module.css";
import { Box } from "@mui/material";
import Logo from "../../pages/UserManagement/img/Logo.svg";
import UserMenuComponent from "./../UserMenu/index";
import { useNavigate } from "react-router-dom";
import CustomSearchField from "../SearchField";
import RefinedSearch from './../RefinedSearch/index';
import RefinedSearchInputs from './../RefinedSearchInputs/index';

interface IHeader {
  showSearch?: boolean
  showRefinedSearch?: boolean
  screen?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Header = (props: IHeader) => {

  const {
    showSearch = false,
    showRefinedSearch = false,
    screen,
    onKeyDown
  } = props
  const navigate = useNavigate();
  const [areSearchFiltersOpen, setSearchFiltersOpen] = useState<boolean>(false)

  const toggleSearchFilters = (e: React.MouseEvent) => {
    setSearchFiltersOpen(state => !state)
  }

  return (
    <>
      {screen === "landing" ?
        <>
          <Box sx={{
            position: 'absolute',
            top: '3%',
            right: '0'
          }}>
            <UserMenuComponent />
          </Box>
        </>
        :
        <Box className={`${styles["header-container"]}`}>
          <Box className={`${styles["header-lhs-content"]}`}>
            <Box className={`${styles["logo"]}`}>
              <Box component="img" alt="NEOM logo" src={Logo} onClick={() => navigate("/")} />
            </Box>
            {
              showSearch &&
              <CustomSearchField
                onKeyDown={onKeyDown}
                className={`${styles["header-search"]}`}
              />
            }
            {
              showRefinedSearch &&
              <RefinedSearch
                className={`${styles["header-refined-search"]}`}
                handleClick={toggleSearchFilters}
              />
            }
            <UserMenuComponent />
          </Box>
          {areSearchFiltersOpen && <Box>
            <RefinedSearchInputs />
          </Box>}
        </Box>}
    </>
  );
};

export default Header;
