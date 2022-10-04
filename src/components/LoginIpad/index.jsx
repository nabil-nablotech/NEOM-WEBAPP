import React from "react";
import Group2608847 from "../Group2608847";
import Group2608846 from "../Group2608846";
import styled from "styled-components";
import "./LoginIpad.css";

function LoginIpad(props) {
  const { frame2608166, image3, group2608847Props, group2608846Props } = props;

  return (
    <div className="login-ipad screen">
      <Frame2608167>
        <FrameContainer>
          <Frame2608166 style={{ backgroundImage: `url(${frame2608166})` }}>
            <OverlapGroup>
              <Image3 src={image3} alt="image 3" />
            </OverlapGroup>
          </Frame2608166>
          <Frame2608161>
            <Group2608847
              className={group2608847Props.className}
              textField1Props={group2608847Props.textField1Props}
              textField2Props={group2608847Props.textField2Props}
            />
            <Group2608846 className={group2608846Props.className} />
          </Frame2608161>
        </FrameContainer>
      </Frame2608167>
    </div>
  );
}

const Frame2608167 = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  min-width: 834px;
  border: 1px none;
`;

const FrameContainer = styled.div`
  width: 834px;
  height: 1194px;
  position: relative;
`;

const Frame2608166 = styled.div`
  position: absolute;
  height: 1194px;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  min-width: 287px;
  border: 1px none;
  background-size: cover;
  background-position: 50% 50%;
`;

const OverlapGroup = styled.div`
  height: 1194px;
  display: flex;
  padding: 142px 106px;
  align-items: flex-end;
  min-width: 287px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1899999976158142) 0%, rgb(0, 0, 0) 100%);
`;

const Image3 = styled.img`
  width: 72px;
  height: 93px;
  object-fit: cover;
`;

const Frame2608161 = styled.div`
  position: absolute;
  width: 547px;
  top: 0;
  left: 287px;
  display: flex;
  flex-direction: column;
  padding: 24px 40.3px;
  align-items: flex-end;
  min-height: 1194px;
  gap: 354px;
  border: 1px none;
`;

export default LoginIpad;
