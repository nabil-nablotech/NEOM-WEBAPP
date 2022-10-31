import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RobotoMediumMerino20px } from "../styledMixins";
import WhiteCircle from "../../assets/images/WhiteCircle.svg";
import useLogout from "../../hooks/useLogout";
import { stringAvatar } from "../../utils/services/helpers";
import { RootState } from "../../store";
import { getRole } from "../../utils/storage/storage";

import MenuList from "../MenuList";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleNewItemWindow } from "../../store/reducers/searchResultsReducer";
import CustomDrawer from "../CustomDrawer";
import AddNewItem from "../../pages/AddNewItem";

/** Component for top-right header icons */
function UserMenuComponent() {
  const iconUserWhite = WhiteCircle;
  const icon =
    "https://anima-uploads.s3.amazonaws.com/projects/633d15940ae1dbd35fe0139d/releases/633d15a99ef6389a71e4e537/img/icon@1x.png";
  const iconSettings =
    "https://anima-uploads.s3.amazonaws.com/projects/633d15940ae1dbd35fe0139d/releases/633d15a99ef6389a71e4e537/img/icon-button-settings@1x.png";

  const { clientLogout } = useLogout();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElSettings, setAnchorElSettings] = React.useState<null | HTMLElement>(null);
  const {newItemWindowOpen} = useSelector((state: RootState) => state.searchResults);

  const open = Boolean(anchorEl);
  const admin = getRole() === 'Admin';
  const openSettings = Boolean(anchorElSettings);
  const dispatch = useDispatch()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget);
  };
  const handleSettingsClick = (event: React.MouseEvent<HTMLImageElement>) => {
    // event.preventDefault()
    // setAnchorElSettings(event.currentTarget);
    navigate("/user-management");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClose = () => {
    setAnchorElSettings(null);
  };
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.login);

  if (!data) return null;

  // enable below for local run
  // if (!data) {};


  const menuItems = [
    {
      label: "Support",
      handleClickMenuItem: () => {},
      render: () => <a href="mailto: support@neomheritage.com?subject = Neom Heritage Support" rel="noreferrer" target={"_blank"}>
      Help & Support
      </a>
    },
    {
      label: "Sign Out",
      handleClickMenuItem: () => {
        clientLogout();
      },
    },
  ]

  const menuSettingItems = [
    {
      label: "User Management",
      handleClickMenuItem: () => {
        navigate("/user-management");
      },
    }
  ]

  return (
    <>
      <Box component="div" sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5em',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: '1em'
      }}>
        <Icon src={icon} alt="icon" style={{ cursor: 'pointer' }} onClick={
          e => dispatch(toggleNewItemWindow(!newItemWindowOpen))
        }/>
        {admin && <IconSettings onClick={(e) => handleSettingsClick(e)} src={iconSettings} alt="icon-settings" />}
        <InitialsWrapper
          id="long-button"
          //@ts-ignore
          onClick={e => handleClick(e)}
        >
          <div>{stringAvatar(`${data?.firstName} ${data?.lastName}`)}</div>
          <IconUserWhite src={iconUserWhite} alt="icon-user-white" />
        </InitialsWrapper>

        <MenuList
          ariaLabelledBy='long-button'
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          options={menuItems}
        />
        <MenuList
          ariaLabelledBy='long-button'
          anchorEl={anchorElSettings}
          open={openSettings}
          handleClose={handleSettingsClose}
          options={menuSettingItems}
        />
        <CustomDrawer origin="right" isOpen={newItemWindowOpen} onClose={() => dispatch(toggleNewItemWindow(!newItemWindowOpen))}>
          <AddNewItem onClose={() => dispatch(toggleNewItemWindow(!newItemWindowOpen))}/>
        {/* {
          tabName === PLACES_TAB_NAME &&
          <AddNewPlace create={createPlace} onClose={() => dispatch(toggleNewItemWindow(!newItemWindowOpen))}/>
        }
        {
          tabName === EVENTS_TAB_NAME &&
          <AddNewEvent create={createEvent} onClose={() => dispatch(toggleNewItemWindow(!newItemWindowOpen))}/>
        }
        {
          tabName === MEDIA_TAB_NAME &&
          <AddNewMedia onClose={() => dispatch(toggleNewItemWindow(!newItemWindowOpen))}/>
        } */}
      </CustomDrawer>
      </Box>
    </>
  );
}

const IconUserWhite = styled.img`
  width: 40px;
  height: 40px;
`;
const InitialsWrapper = styled.div`
  position: relative;
  cursor: pointer;
  color: #fffF;
  z-index: 2;
  & div:nth-child(1) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${RobotoMediumMerino20px};
    font-size: 20px;
  }
`;

const Icon = styled.img`
  // position: fixed;
  width: 34px;
  height: 34px;
  // top: 25px;
  // left: 1272px;
  z-index: 4;
`;

const IconSettings = styled.img`
  // position: fixed;
  width: 40px;
  height: 40px;
  // top: 24px;
  // left: 1317px;
  z-index: 3;
  cursor: pointer;
`;

export default UserMenuComponent;
