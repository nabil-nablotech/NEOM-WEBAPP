import React from "react";
import SearchField from "../SearchField";
import Frame2608168 from "../Frame2608168";
import Frame2608169 from "../Frame2608169";
import Frame2608170 from "../Frame2608170";
import Frame2608171 from "../Frame2608171";
import UserMenu from "../UserMenu";
import styled from "styled-components";
import "./LandingPage.css";

function LandingPage(props) {
  const { overlapGroup4, image2, icon, iconSettings, searchFieldProps, userMenuProps } = props;

  return (
    <div className="container-center-horizontal">
      <div className="landing-page screen">
        <OverlapGroup4 style={{ backgroundImage: `url(${overlapGroup4})` }}>
          <Rectangle69></Rectangle69>
          <Frame2608172>
            <Image2 src={image2} alt="image 2" />
            <SearchField className={searchFieldProps.className} />
            <Inventory>
              <Frame2608168 />
              <Frame2608169 />
              <Frame2608170 />
              <Frame2608171 />
            </Inventory>
          </Frame2608172>
        </OverlapGroup4>
        <UserMenu className={userMenuProps.className} />
        <Icon src={icon} alt="icon" />
        <IconSettings src={iconSettings} alt="icon-settings" />
      </div>
    </div>
  );
}

const OverlapGroup4 = styled.div`
  width: 1440px;
  height: 931px;
  z-index: 1;
  position: relative;
  background-size: cover;
  background-position: 50% 50%;
`;

const Rectangle69 = styled.div`
  position: absolute;
  width: 1440px;
  height: 931px;
  top: 0;
  left: 0;
  border: 1px none;
  mix-blend-mode: multiply;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1899999976158142) 0%, rgb(0, 0, 0) 100%);
`;

const Frame2608172 = styled.div`
  position: absolute;
  width: 868px;
  top: 301px;
  left: 286px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 328px;
  border: 1px none;
`;

const Image2 = styled.img`
  width: 72px;
  height: 93px;
  object-fit: cover;
`;

const Inventory = styled.div`
  display: flex;
  position: relative;
  margin-top: 63px;
  width: 868px;
  align-items: center;
  justify-content: center;
  gap: 50px;
  border: 1px none;
`;

const Icon = styled.img`
  position: fixed;
  width: 34px;
  height: 34px;
  top: 25px;
  left: 1272px;
  z-index: 4;
`;

const IconSettings = styled.img`
  position: fixed;
  width: 40px;
  height: 40px;
  top: 24px;
  left: 1317px;
  z-index: 3;
`;

export default LandingPage;
