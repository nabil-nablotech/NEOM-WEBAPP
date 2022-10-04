import React from "react";
import styled from "styled-components";
import { RobotoMediumStarDust12px, ValignTextMiddle } from "../styledMixins";


function Button() {
  return (
    <Button1>
      <LabelText>SIGN IN</LabelText>
    </Button1>
  );
}

const Button1 = styled.div`
  display: flex;
  align-self: flex-start;
  margin-top: 45px;
  flex-direction: column;
  width: 118px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 24px;
  background-color: var(--eerie-black);
  border-radius: 100px;
  overflow: hidden;
  border: 0px none;
`;

const LabelText = styled.div`
  ${ValignTextMiddle}
  ${RobotoMediumStarDust12px}
            width: fit-content;
  text-align: center;
  letter-spacing: 2px;
  line-height: 20px;
  white-space: nowrap;
`;

const Button2 = styled.div`
  display: flex;
  align-self: flex-start;
  margin-top: 45px;
  flex-direction: column;
  width: 118px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 24px;
  background-color: var(--eerie-black);
  border-radius: 100px;
  overflow: hidden;
  border: 0px none;
`;

const LabelText1 = styled.div`
  ${ValignTextMiddle}
  ${RobotoMediumStarDust12px}
            width: fit-content;
  text-align: center;
  letter-spacing: 2px;
  line-height: 20px;
  white-space: nowrap;
`;

export default Button;
