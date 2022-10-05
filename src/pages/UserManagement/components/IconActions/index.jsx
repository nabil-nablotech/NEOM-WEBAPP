import React from "react";
import styled from "styled-components";


function IconActions(props) {
  const { className } = props;

  return (
    <IconActions1 className={`icon-actions ${className || ""}`}>
      <Ellipse3 className="ellipse-3"></Ellipse3>
      <Ellipse3 className="ellipse-4"></Ellipse3>
      <Ellipse3 className="ellipse-5"></Ellipse3>
    </IconActions1>
  );
}

const IconActions1 = styled.div`
  position: absolute;
  height: 25px;
  top: 211px;
  left: 20px;
  display: flex;
  padding: 10.9px 6px;
  justify-content: flex-end;
  align-items: flex-end;
  min-width: 25px;
  gap: 2px;
  border-radius: 12.5px;
  border: 1px none;

  &.icon-actions.icon-actions-1 {
    top: 147px;
  }

  &.icon-actions.icon-actions-2 {
    top: 83px;
  }

  &.icon-actions.icon-actions-3 {
    top: 19px;
  }
`;

const Ellipse3 = styled.div`
  width: 3px;
  height: 3px;
  background-color: var(--licorice);
  border-radius: 1.55px;
  border: 1px none;
`;

export default IconActions;
