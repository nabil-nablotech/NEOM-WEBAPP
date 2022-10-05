import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenuList from "../MenuList";
import { RobotoMediumMerino20px } from "../styledMixins";
import WhiteCircle from "../../assets/images/WhiteCircle.svg";
import useAuth from "../../hooks/useAuth";

function UserMenuComponent({
  userInitials
}) {

  const iconUserWhite = WhiteCircle;
  const icon = "https://anima-uploads.s3.amazonaws.com/projects/633d15940ae1dbd35fe0139d/releases/633d15a99ef6389a71e4e537/img/icon@1x.png";
  const iconSettings = "https://anima-uploads.s3.amazonaws.com/projects/633d15940ae1dbd35fe0139d/releases/633d15a99ef6389a71e4e537/img/icon-button-settings@1x.png";

  const [menuOpen, setMenuOpen] = useState(false);
  const {clientLogout} = useAuth()

  const navigate = useNavigate()

  const handleClick = e => {
    e.preventDefault()
    setMenuOpen(state => !state)
  }

  return (
    <>
    <UserMenu>
      <Icon src={icon} alt="icon" />
      <IconSettings src={iconSettings} alt="icon-settings" />
      <InitialsWrapper onClick={e => handleClick(e)}
      >
        <div>{userInitials}</div>
        <IconUserWhite src={iconUserWhite} alt="icon-user-white" />
        
      </InitialsWrapper>
      
      <MenuList menuOpen={menuOpen} 
        menuItemsArray={[
          {
            label: 'Profile',
            handleClickMenuItem: (e) => {
              navigate("/user-management")
            }
          },
          {
            label: 'Logout',
            handleClickMenuItem: () => {clientLogout()}
          },
        ]}
      />
    </UserMenu>
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
  & div:nth-child(1) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
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
`;


const UserMenu = styled.div`
  position: fixed;
  height: fit-content;
  top: 24px;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 175px;
  // border: 1px none;
  gap: 20px;
  margin-right: 2vw;
  & img {
    cursor:pointer
  }
`;

const UserMenu1 = styled.div`
  position: fixed;
  height: 144px;
  top: 24px;
  left: 637px;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 175px;
  border: 1px none;

  &.user-menu.user-menu-1 {
    left: 1238px;
  }
`;

export default UserMenuComponent;
