import React from "react";
import Group2608847 from "../Group2608847";
import Group2608846 from "../Group2608846";
import styled from "styled-components";
import "./Login.css";

type LoginProps = {
  frame2608166: any, image3: string, group2608847Props: any 
}
function Login(props: LoginProps) {
  const { frame2608166, image3, group2608847Props } = props;

  return (
    <div className="login screen">
      <Frame2608167>
        <Frame2608166 style={{ backgroundImage: `url(${frame2608166})` }}>
          <OverlapGroup>
            <Image3 src={image3} alt="image 3" />
          </OverlapGroup>
        </Frame2608166>
        <Frame2608161>
          <Group2608847
            textField1Props={group2608847Props.textField1Props}
            textField2Props={group2608847Props.textField2Props}
          />
          <Group2608846 />
        </Frame2608161>
      </Frame2608167>
    </div>
  );
}

const Frame2608167 = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  min-width: 1440px;
  border: 1px none;
`;

const Frame2608166 = styled.div`
  display: flex;
  align-items: flex-start;
  min-width: 495px;
  border: 1px none;
  background-size: cover;
  background-position: 50% 50%;
`;

const OverlapGroup = styled.div`
  height: 931px;
  display: flex;
  padding: 126px 211px;
  align-items: flex-end;
  min-width: 495px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1899999976158142) 0%, rgb(0, 0, 0) 100%);
`;

const Image3 = styled.img`
  width: 72px;
  height: 93px;
  object-fit: cover;
`;

const Frame2608161 = styled.div`
  width: 945px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px 44px;
  align-items: flex-end;
  min-height: 931px;
  gap: 222px;
  border: 1px none;
`;

export default Login;
