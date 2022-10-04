import React from "react";
import styled from "styled-components";
import { RobotoMediumWhite12px, ValignTextMiddle } from "../styledMixins";


function Button22(props) {
  const { children } = props;

  return (
    <Button>
      <LabelText>{children}</LabelText>
    </Button>
  );
}

const Button = styled.div`
  display: flex;
  margin-left: 10px;
  width: 103px;
  height: 40px;
  margin-top: 45px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 24px;
  background-color: var(--licorice-2);
  border-radius: 100px;
  overflow: hidden;
  border: 0px none;
`;

const LabelText = styled.div`
  ${ValignTextMiddle}
  ${RobotoMediumWhite12px}
            width: fit-content;
  text-align: center;
  letter-spacing: 2px;
  line-height: 20px;
  white-space: nowrap;
`;

export default Button22;
