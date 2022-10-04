import React from "react";
import TextField3 from "../TextField3";
import styled from "styled-components";
import {
  RobotoNormalLicorice16px2,
  RobotoNormalLicorice16px3,
  RobotoMediumWhite12px,
  RobotoNormalLicorice16px,
  RobotoMediumBlack30px,
  ValignTextMiddle,
} from "../styledMixins";
import "./IPadPro119.css";

function IPadPro119(props) {
  const {
    overlapGroup,
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
      <div className="ipad-pro-11-9 screen">
        <OverlapGroup style={{ backgroundImage: `url(${overlapGroup})` }}>
          <Rectangle69></Rectangle69>
          <Image3 src={image3} alt="image 3" />
        </OverlapGroup>
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
                <span className="roboto-medium-white-12px">{spanText3}</span>
              </span>
            </LabelText>
          </Button>
          <OverlapGroup1>
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
          </OverlapGroup1>
        </FlexCol>
      </div>
    </div>
  );
}

const OverlapGroup = styled.div`
  width: 278px;
  height: 1194px;
  position: relative;
  background-size: cover;
  background-position: 50% 50%;
`;

const Rectangle69 = styled.div`
  position: absolute;
  width: 278px;
  height: 1194px;
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
  top: 979px;
  left: 103px;
  object-fit: cover;
`;

const FlexCol = styled.div`
  width: 466px;
  position: relative;
  margin-top: 330px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 844px;
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
  background-color: var(--licorice-2);
  border-radius: 100px;
  overflow: hidden;
  border: 0px none;
`;

const LabelText = styled.div`
  ${ValignTextMiddle}
  ${RobotoMediumWhite12px}
            height: 20px;
  min-width: 55px;
  text-align: center;
  letter-spacing: 2px;
  line-height: 20px;
  white-space: nowrap;
`;

const OverlapGroup1 = styled.div`
  width: 440px;
  height: 75px;
  position: relative;
  align-self: flex-end;
  margin-top: 396px;
  margin-right: 2px;
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

export default IPadPro119;
