import React from "react";
import SiteListViewItemUser from "../SiteListViewItemUser";
import IconActions from "../IconActions";
import styled from "styled-components";
import {
  RobotoNormalLicorice16px2,
  RobotoMediumWhite14px,
  RobotoMediumWhite12px,
  RobotoMediumLicorice30px,
  RobotoNormalLicorice14px,
  ValignTextMiddle,
} from "../../styledMixins";
import "./UserManagement.css";
import "../../globals.css"
import "../../styleguide.css"
import CompLogo from "../../static/img/logo-1-1@2x.png";


// export default App;
const siteListViewItemUser1Data = {
    spanText4: "Editor",
};

const siteListViewItemUser2Data = {
    spanText4: "Editor",
    className: "site-list-view-item-user-1",
};

const siteListViewItemUser3Data = {
    spanText4: "Admin",
    className: "site-list-view-item-user-2",
};

const siteListViewItemUser4Data = {
    spanText4: "Editor",
    className: "site-list-view-item-user-3",
};

const iconActions2Data = {
    className: "icon-actions-1",
};

const iconActions3Data = {
    className: "icon-actions-2",
};

const iconActions4Data = {
    className: "icon-actions-3",
};

const userManagementData = {
  logo1: CompLogo,
  spanText1: "MA",
  icon1: "../../static/img/icon@1x.png",
  iconSettings: "../../static/img/icon-button-settings@1x.png",
  spanText2: "USERS",
  icon2: "../../static/img/icon-2@2x.png",
  spanText3: "user",
  iconSearch: "../../static/img/leading-icon@1x.png",
  spanText4: "Search",
  spanText5: "LAST NAME",
  sortAscending: "../../static/img/sort-ascending-1@2x.png",
  spanText6: "FIRST NAME",
  spanText7: "EMAIL ADDRESS",
  spanText8: "ROLE ASSIGNED",
  spanText9: "LAST LOGIN",
  spanText10: "STATUS",
  line30: "../../static/img/line-30-1@2x.png",
  line32: "../../static/img/line-33-1@2x.png",
  line33: "../../static/img/line-33-1@2x.png",
  line34: "../../static/img/line-33-1@2x.png",
  line35: "../../static/img/line-33-1@2x.png",
  line31: "../../static/img/line-33-1@2x.png",
  siteListViewItemUser1Props: siteListViewItemUser1Data,
  siteListViewItemUser2Props: siteListViewItemUser2Data,
  siteListViewItemUser3Props: siteListViewItemUser3Data,
  siteListViewItemUser4Props: siteListViewItemUser4Data,
  iconActions1Props: iconActions2Data,
  iconActions2Props: iconActions3Data,
  iconActions3Props: iconActions4Data,
};



function UserManagement(props) {
  const {
    logo1,
    spanText1,
    icon1,
    iconSettings,
    spanText2,
    icon2,
    spanText3,
    iconSearch,
    spanText4,
    spanText5,
    sortAscending,
    spanText6,
    spanText7,
    spanText8,
    spanText9,
    spanText10,
    line30,
    line32,
    line33,
    line34,
    line35,
    line31,
    siteListViewItemUser1Props,
    siteListViewItemUser2Props,
    siteListViewItemUser3Props,
    siteListViewItemUser4Props,
    iconActions1Props,
    iconActions2Props,
    iconActions3Props,
  } = userManagementData;

  return (
    <div className="container-center-horizontal">
      <div className="user-management screen">
        <HeaderWithoutSearch>
          <OverlapGroup>
            <Rectangle21></Rectangle21>
            <Logo>
              <Logo1 src={logo1} alt="logo 1" />
            </Logo>
            <UserMenu>
              <IconUserWhite>
                <StateLayer>
                  <Iconssettings24px>
                    <MA>
                      <span>
                        <span className="roboto-medium-white-14px">{spanText1}</span>
                      </span>
                    </MA>
                  </Iconssettings24px>
                </StateLayer>
              </IconUserWhite>
            </UserMenu>
            <Icon src={icon1} alt="icon" />
            <IconSettings src={iconSettings} alt="icon-settings" />
          </OverlapGroup>
        </HeaderWithoutSearch>
        <Title>
          <span className="roboto-medium-licorice-30px">{spanText2}</span>
        </Title>
        <Button>
          <Icon1 src={icon2} alt="icon" />
          <LabelText>
            <span>
              <span className="roboto-medium-white-12px">{spanText3}</span>
            </span>
          </LabelText>
        </Button>
        <SearchField>
          <Content>
            <IconSearch src={iconSearch} alt="icon-search" />
            <LabelText1>
              <span>
                <span className="roboto-normal-licorice-16px-2">{spanText4}</span>
              </span>
            </LabelText1>
          </Content>
        </SearchField>
        <Frame2608174>
          <UserListHeader>
            <Navbar>
              <Frame2608176>
                <LASTNAME>
                  <span className="roboto-normal-licorice-14px">{spanText5}</span>
                </LASTNAME>
                <SortAscending src={sortAscending} alt="sort-ascending" />
              </Frame2608176>
              <NavbarLinkFIRSTNAME>
                <span className="roboto-normal-licorice-14px">{spanText6}</span>
              </NavbarLinkFIRSTNAME>
              <NavbarLinkEMAILADDRESS>
                <span className="roboto-normal-licorice-14px">{spanText7}</span>
              </NavbarLinkEMAILADDRESS>
              <NavbarLinkROLEASSIGNED>
                <span className="roboto-normal-licorice-14px">{spanText8}</span>
              </NavbarLinkROLEASSIGNED>
              <NavbarLinkROLEASSIGNED>
                <span className="roboto-normal-licorice-14px">{spanText9}</span>
              </NavbarLinkROLEASSIGNED>
              <NavbarLinkSTATUS>
                <span className="roboto-normal-licorice-14px">{spanText10}</span>
              </NavbarLinkSTATUS>
            </Navbar>
          </UserListHeader>
          <SiteListViewItemUserContainer>
            <SiteListViewItemUser spanText4={siteListViewItemUser1Props.spanText4} />
            <SiteListViewItemUser
              spanText4={siteListViewItemUser2Props.spanText4}
              className={siteListViewItemUser2Props.className}
            />
            <SiteListViewItemUser
              spanText4={siteListViewItemUser3Props.spanText4}
              className={siteListViewItemUser3Props.className}
            />
            <SiteListViewItemUser
              spanText4={siteListViewItemUser4Props.spanText4}
              className={siteListViewItemUser4Props.className}
            />
          </SiteListViewItemUserContainer>
        </Frame2608174>
        <Group2608848>
          <OverlapGroup6>
            <IconActions />
            <IconActions className={iconActions1Props.className} />
            <IconActions className={iconActions2Props.className} />
            <IconActions className={iconActions3Props.className} />
            <LineContainer>
              <Line30 src={line30} alt="Line 30" />
              <Line32 src={line32} alt="Line 32" />
              <Line33 src={line33} alt="Line 33" />
              <Line34 src={line34} alt="Line 34" />
              <Line35 src={line35} alt="Line 35" />
            </LineContainer>
          </OverlapGroup6>
          <Line31 src={line31} alt="Line 31" />
        </Group2608848>
      </div>
    </div>
  );
}

const HeaderWithoutSearch = styled.div`
  height: 81px;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  min-width: 1439px;
  border: 1px none;
`;

const OverlapGroup = styled.div`
  width: 1440px;
  height: 165px;
  position: relative;
  margin-bottom: -84px;
`;

const Rectangle21 = styled.div`
  position: absolute;
  width: 1440px;
  height: 81px;
  top: 0;
  left: 0;
  background-color: var(--licorice);
  border: 1px none;
`;

const Logo = styled.div`
  position: absolute;
  height: 37px;
  top: 23px;
  left: 13px;
  display: flex;
  align-items: flex-start;
  min-width: 138px;
  border: 1px none;
`;

const Logo1 = styled.img`
  width: 140px;
  height: 36px;
  object-fit: cover;
`;

const UserMenu = styled.div`
  position: absolute;
  height: 144px;
  top: 21px;
  left: 1239px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 175px;
  border: 1px none;
`;

const IconUserWhite = styled.div`
  width: 42px;
  height: 42px;
  margin-top: -1px;
  display: flex;
  align-items: flex-start;
  border-radius: 100px;
  overflow: hidden;
  border: 1px solid;
  border-color: var(--white);
`;

const StateLayer = styled.div`
  height: 40px;
  display: flex;
  padding: 0 8px;
  align-items: center;
  min-width: 40px;
  border: 1px none;
`;

const Iconssettings24px = styled.div`
  height: 24px;
  display: flex;
  align-items: flex-start;
  min-width: 24px;
  border: 1px none;
`;

const MA = styled.div`
  ${ValignTextMiddle}
  ${RobotoMediumWhite14px}
            width: 24px;
  height: 31px;
  margin-top: -4.5px;
  text-align: center;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

const Icon = styled.img`
  position: absolute;
  width: 34px;
  height: 34px;
  top: 25px;
  left: 1264px;
`;

const IconSettings = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  top: 22px;
  left: 1317px;
`;

const Title = styled.h1`
  ${RobotoMediumLicorice30px}
  width: 493px;
  z-index: 2;
  min-height: 42px;
  margin-top: 62px;
  margin-left: 54px;
  letter-spacing: 5px;
`;

const Button = styled.div`
  width: 102px;
  height: 40px;
  z-index: 4;
  align-self: flex-end;
  margin-top: 3px;
  margin-right: 31px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  gap: 8px;
  background-color: var(--licorice);
  border-radius: 100px;
  overflow: hidden;
  border: 0px none;
`;

const Icon1 = styled.img`
  width: 18px;
  height: 18px;
`;

const LabelText = styled.div`
  ${ValignTextMiddle}
  ${RobotoMediumWhite12px}
            height: 20px;
  min-width: 36px;
  text-align: center;
  letter-spacing: 2px;
  line-height: 20px;
  white-space: nowrap;
`;

const SearchField = styled.div`
  z-index: 3;
  margin-top: 17px;
  margin-left: 54px;
  display: flex;
  padding: 0 14px;
  align-items: flex-start;
  min-width: 380px;
  background-color: var(--white);
  border-radius: 4px;
  border: 1px solid;
  border-color: #e8e9e9;
`;

const Content = styled.div`
  height: 40px;
  display: flex;
  padding: 7px 0;
  align-items: center;
  min-width: 352px;
  gap: 9px;
  border: 1px none;
`;

const IconSearch = styled.img`
  width: 24px;
  height: 24px;
  align-self: flex-end;
`;

const LabelText1 = styled.div`
  ${ValignTextMiddle}
  ${RobotoNormalLicorice16px2}
            width: 279px;
  height: 8px;
  letter-spacing: 0.5px;
  line-height: 24px;
  white-space: nowrap;
`;

const Frame2608174 = styled.div`
  width: 1267px;
  height: 300px;
  z-index: 5;
  align-self: center;
  margin-top: 36px;
  margin-right: 67px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  overflow: hidden;
  border: 1px none;
`;

const UserListHeader = styled.div`
  margin-left: 22px;
  display: flex;
  align-items: flex-start;
  min-width: 1093px;
  border: 1px none;
`;

const Navbar = styled.div`
  ${RobotoNormalLicorice14px}
  display: flex;
  align-items: flex-start;
  min-width: 1092px;
  gap: 56px;
  border: 1px none;
`;

const Frame2608176 = styled.div`
  height: 33px;
  display: flex;
  align-items: flex-start;
  min-width: 111px;
  gap: 7px;
  border: 1px none;
`;

const LASTNAME = styled.div`
  width: 86px;
  min-height: 33px;
  margin-top: -1px;
  letter-spacing: 0.5px;
  line-height: 35px;
  white-space: nowrap;
`;

const SortAscending = styled.img`
  width: 18px;
  height: 18px;
  align-self: center;
  margin-bottom: 1px;
`;

const NavbarLinkFIRSTNAME = styled.div`
  width: 100px;
  min-height: 33px;
  margin-top: -1px;
  letter-spacing: 0.5px;
  line-height: 35px;
  white-space: nowrap;
`;

const NavbarLinkEMAILADDRESS = styled.div`
  width: 200px;
  min-height: 33px;
  margin-top: -1px;
  letter-spacing: 0.5px;
  line-height: 35px;
  white-space: nowrap;
`;

const NavbarLinkROLEASSIGNED = styled.div`
  width: 134px;
  min-height: 33px;
  margin-top: -1px;
  letter-spacing: 0.5px;
  line-height: 35px;
  white-space: nowrap;
`;

const NavbarLinkSTATUS = styled.div`
  min-height: 33px;
  margin-top: -1px;
  letter-spacing: 0.5px;
  line-height: 35px;
  white-space: nowrap;
`;

const SiteListViewItemUserContainer = styled.div`
  width: 1327px;
  height: 257px;
  position: relative;
`;

const Group2608848 = styled.div`
  position: fixed;
  width: 60px;
  top: 365px;
  left: 1320px;
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 256px;
  gap: 1px;
`;

const OverlapGroup6 = styled.div`
  width: 60px;
  height: 255px;
  position: relative;
`;

const LineContainer = styled.div`
  position: absolute;
  width: 60px;
  height: 255px;
  top: 0;
  left: 0;
`;

const Line30 = styled.img`
  position: absolute;
  width: 1px;
  height: 255px;
  top: 0;
  left: 0;
`;

const Line32 = styled.img`
  position: absolute;
  width: 60px;
  height: 1px;
  top: 192px;
  left: 0;
`;

const Line33 = styled.img`
  position: absolute;
  width: 60px;
  height: 1px;
  top: 128px;
  left: 0;
`;

const Line34 = styled.img`
  position: absolute;
  width: 60px;
  height: 1px;
  top: 64px;
  left: 0;
`;

const Line35 = styled.img`
  position: absolute;
  width: 60px;
  height: 1px;
  top: 0;
  left: 0;
`;

const Line31 = styled.img`
  width: 60px;
  height: 1px;
`;

export default UserManagement;
