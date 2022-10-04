import React from "react";
import TextField3 from "../TextField3";
import styled from "styled-components";
import {
  RobotoNormalLicorice16px2,
  RobotoNormalLicorice16px3,
  RobotoNormalLicorice16px,
  RobotoMediumBlack30px,
  RobotoMediumStarDust12px,
  ValignTextMiddle,
} from "../styledMixins";
import "./Login1.css";

function Login1(props) {
  const {
    overlapGroup1,
    image3,
    spanText1,
    spanText2,
    spanText3,
    spanText4,
    spanText5,
    spanText6,
    spanText7,
    spanText8,
    textField1Props,
    textField2Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="login-1 screen">
        <OverlapGroup1 style={{ backgroundImage: `url(${overlapGroup1})` }}>
          <Rectangle69></Rectangle69>
          <Image3 src={image3} alt="image 3" />
        </OverlapGroup1>
        <FlexCol>
          <SignInToNeomHeritage>
            <span>
              <span className="roboto-medium-black-30px">{spanText1}</span>
            </span>
          </SignInToNeomHeritage>
          <EnterYourDetailsBelow>
            <span>
              <span className="roboto-normal-licorice-16px-3">{spanText2}</span>
            </span>
          </EnterYourDetailsBelow>
          <TextField3>{textField1Props.children}</TextField3>
          <TextField3 className={textField2Props.className}>{textField2Props.children}</TextField3>
          <Button>
            <LabelText>
              <span>
                <span className="roboto-medium-star-dust-12px">{spanText3}</span>
              </span>
            </LabelText>
          </Button>
          <OverlapGroup>
            <DontHaveAnAccoun>
              <span>
                <span className="roboto-normal-licorice-16px">{spanText4}</span>
                <span className="roboto-normal-licorice-16px-2">{spanText5}</span>
              </span>
            </DontHaveAnAccoun>
            <AddEmbedCodeInstead>
              <AddEmbedCodeInstead1>
                <span className="roboto-normal-licorice-16px-2">{spanText6}</span>
                <span className="roboto-normal-licorice-16px-2">{spanText7}</span>
                <span className="roboto-normal-licorice-16px-2">{spanText8}</span>
              </AddEmbedCodeInstead1>
            </AddEmbedCodeInstead>
          </OverlapGroup>
        </FlexCol>
      </div>
    </div>
  );
}

const OverlapGroup1 = styled.div`
  width: 495px;
  height: 931px;
  position: relative;
  background-size: cover;
  background-position: 50% 50%;
`;

const Rectangle69 = styled.div`
  position: absolute;
  width: 495px;
  height: 931px;
  top: 0;
  left: 0;
  border: 1px none;
  mix-blend-mode: multiply;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1899999976158142) 0%, rgb(0, 0, 0) 100%);
`;

const Image3 = styled.img`
  position: absolute;
  width: 72px;
  height: 93px;
  top: 712px;
  left: 211px;
  object-fit: cover;
`;

const FlexCol = styled.div`
  width: 636px;
  position: relative;
  margin-top: 237px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 669px;
`;

const SignInToNeomHeritage = styled.div`
  ${ValignTextMiddle}
  ${RobotoMediumBlack30px}
            width: 462px;
  height: 126px;
  margin-left: 4px;
  letter-spacing: 5px;
`;

const EnterYourDetailsBelow = styled.div`
  ${ValignTextMiddle}
  ${RobotoNormalLicorice16px3}
            height: 20px;
  margin-bottom: -4px;
  margin-top: 11px;
  margin-left: 4px;
  letter-spacing: 0.5px;
  line-height: 24px;
  white-space: nowrap;
`;

const Button = styled.div`
  width: 103px;
  height: 40px;
  margin-top: 45px;
  display: flex;
  padding: 0 24px;
  align-items: center;
  background-color: var(--eerie-black);
  border-radius: 100px;
  overflow: hidden;
  border: 0px none;
`;

const LabelText = styled.div`
  ${ValignTextMiddle}
  ${RobotoMediumStarDust12px}
            height: 20px;
  min-width: 55px;
  text-align: center;
  letter-spacing: 2px;
  line-height: 20px;
  white-space: nowrap;
`;

const OverlapGroup = styled.div`
  width: 440px;
  height: 75px;
  position: relative;
  align-self: flex-end;
  margin-top: 221px;
`;

const DontHaveAnAccoun = styled.p`
  ${ValignTextMiddle}
  ${RobotoNormalLicorice16px}
            position: absolute;
  width: 433px;
  height: 75px;
  top: 0;
  left: 0;
  text-align: right;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

const AddEmbedCodeInstead = styled.div`
  position: absolute;
  height: 30px;
  top: 39px;
  left: 217px;
  display: flex;
  align-items: flex-start;
  min-width: 223px;
  border: 1px none;
`;

const AddEmbedCodeInstead1 = styled.div`
  ${RobotoNormalLicorice16px2}
  width: 223px;
  min-height: 30px;
  margin-top: -1px;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

export default Login1;
