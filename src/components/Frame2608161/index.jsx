import React from "react";
import TextField from "../TextField";
import Button22 from "../Button22";
import styled from "styled-components";
import { RobotoMediumBlack30px, RobotoNormalLicorice16px3, ValignTextMiddle } from "../styledMixins";
import "./Frame2608161.css";

function Frame2608161(props) {
  const { signInToNeomHeritage, enterYourDetailsBelow, textField1Props, textField2Props, button22Props } = props;

  return (
    <div className="frame-2608161 screen">
      <SignInToNeomHeritage>{signInToNeomHeritage}</SignInToNeomHeritage>
      <EnterYourDetailsBelow>{enterYourDetailsBelow}</EnterYourDetailsBelow>
      <TextField className={textField1Props.className}>{textField1Props.children}</TextField>
      <TextField className={textField2Props.className}>{textField2Props.children}</TextField>
      <Button22>{button22Props.children}</Button22>
    </div>
  );
}

const SignInToNeomHeritage = styled.div`
  ${ValignTextMiddle}
  ${RobotoMediumBlack30px}
            margin-left: 14px;
  width: 462px;
  height: 126px;
  margin-top: -17px;
  letter-spacing: 5px;
`;

const EnterYourDetailsBelow = styled.div`
  ${ValignTextMiddle}
  ${RobotoNormalLicorice16px3}
            margin-left: 14px;
  width: 240px;
  height: 20px;
  margin-top: 11px;
  letter-spacing: 0.5px;
  line-height: 24px;
  white-space: nowrap;
`;

export default Frame2608161;
