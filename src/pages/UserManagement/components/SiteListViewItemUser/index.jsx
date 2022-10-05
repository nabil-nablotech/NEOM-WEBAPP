import React from "react";
import styled from "styled-components";
import { RobotoMediumLicorice16px, RobotoNormalLicorice16px, ValignTextMiddle } from "../../styledMixins";


function SiteListViewItemUser(props) {
  const { spanText4, className } = props;

  return (
    <SiteListViewItemUser1 className={`site-list-view-item-user ${className || ""}`}>
      <OverlapGroup className="overlap-group-1">
        <Line5 className="line-5" src="/img/line-4-4@2x.png" alt="Line 5" />
        <Navbar className="navbar-1">
          <NavbarLinkDoe className="navbar-link-doe">
            <span>
              <span className="spana8nx8 roboto-medium-licorice-16px">Doe</span>
            </span>
          </NavbarLinkDoe>
          <NavbarLinkName className="navbar-link-name">
            <span>
              <span className="spanob3ovl roboto-medium-licorice-16px">John</span>
            </span>
          </NavbarLinkName>
          <NavbarLinkJohnDoeneomcom className="navbar-link-john_doeneomcom">
            <span>
              <span className="spandlf88 roboto-normal-licorice-16px">john_doe@neom.com</span>
            </span>
          </NavbarLinkJohnDoeneomcom>
          <NavbarLinkEditor className="navbar-link-editor">
            <span>
              <span className="span2edli roboto-normal-licorice-16px">{spanText4}</span>
            </span>
          </NavbarLinkEditor>
          <NavbarLinkEditor className="navbar-link-date">
            <span>
              <span className="spanw75d4 roboto-normal-licorice-16px">06/09/2022</span>
            </span>
          </NavbarLinkEditor>
          <NavbarLinkEditor className="navbar-link-active">
            <span>
              <span className="span4cxkl roboto-normal-licorice-16px">Active</span>
            </span>
          </NavbarLinkEditor>
        </Navbar>
      </OverlapGroup>
      <Line4 className="line-4" src="/img/line-4-4@2x.png" alt="Line 4" />
    </SiteListViewItemUser1>
  );
}

const SiteListViewItemUser1 = styled.div`
  position: absolute;
  width: 1327px;
  top: 64px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 65px;
  border: 1px none;

  &.site-list-view-item-user.site-list-view-item-user-1 {
    top: 128px;
  }

  &.site-list-view-item-user.site-list-view-item-user-2 {
    top: 192px;
  }

  &.site-list-view-item-user.site-list-view-item-user-3 {
    top: 0;
  }
`;

const OverlapGroup = styled.div`
  width: 1362px;
  display: flex;
  flex-direction: column;
  padding: 1px 2.6px;
  align-items: flex-start;
  min-height: 65px;
  gap: 11px;
  border-radius: 8px;
`;

const Line5 = styled.img`
  width: 1324px;
  height: 1px;
`;

const Navbar = styled.div`
  margin-left: 19.44px;
  display: flex;
  align-items: flex-start;
  min-width: 1135px;
  gap: 55px;
  border: 1px none;
`;

const NavbarLinkDoe = styled.div`
  ${ValignTextMiddle}
  ${RobotoMediumLicorice16px}
            width: 111px;
  height: 40px;
  margin-top: -1px;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

const NavbarLinkName = styled.div`
  ${ValignTextMiddle}
  ${RobotoMediumLicorice16px}
            width: 100px;
  height: 40px;
  margin-top: -1px;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

const NavbarLinkJohnDoeneomcom = styled.div`
  ${ValignTextMiddle}
  ${RobotoNormalLicorice16px}
            width: 200px;
  height: 40px;
  margin-top: -1px;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

const NavbarLinkEditor = styled.div`
  ${ValignTextMiddle}
  ${RobotoNormalLicorice16px}
            width: 134px;
  height: 40px;
  margin-top: -1px;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

const Line4 = styled.img`
  width: 1324px;
  height: 1px;
  margin-left: 2.56px;
`;

export default SiteListViewItemUser;
