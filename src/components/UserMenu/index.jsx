import React from "react";
import styled from "styled-components";
import { RobotoMediumMerino20px } from "../styledMixins";


function UserMenuComponent({
  icon,
  iconSettings,
  iconUserWhite,
  userInitials
}) {

  return (
    <UserMenu>
      <Icon src={icon} alt="icon" />
      <IconSettings src={iconSettings} alt="icon-settings" />
      <InitialsWrapper>
        <div>{userInitials}</div>
        <IconUserWhite src={iconUserWhite} alt="icon-user-white" />
      </InitialsWrapper>
    </UserMenu>
  );
}

const IconUserWhite = styled.img`
  width: 40px;
  height: 40px;
`;
const InitialsWrapper = styled.div`
  position: relative;
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
  position: absolute;
  height: fit-content;
  top: 24px;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 175px;
  border: 1px none;
  gap: 10px;
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
