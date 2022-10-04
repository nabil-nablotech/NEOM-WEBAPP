import React from "react";
import IconUserWhite from "../IconUserWhite";
import styled from "styled-components";


function UserMenu(props) {
  const { className } = props;

  return (
    <UserMenu1 className={`user-menu ${className || ""}`}>
      <IconUserWhite />
    </UserMenu1>
  );
}

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

export default UserMenu;
