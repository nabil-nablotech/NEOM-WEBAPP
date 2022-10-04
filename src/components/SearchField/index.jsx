import React from "react";
import styled from "styled-components";
import { RobotoNormalLicorice16px, ValignTextMiddle } from "../styledMixins";


function SearchField(props) {
  const { className } = props;

  return (
    <SearchField1 className={`search-field ${className || ""}`}>
      <Content className="content">
        <IconSearch className="icon-search" src="/img/leading-icon@2x.png" alt="icon-search" />
        <LabelText className="label-text">Search</LabelText>
      </Content>
    </SearchField1>
  );
}

const SearchField1 = styled.div`
  width: 381px;
  height: 40px;
  margin-top: 40px;
  margin-left: 23px;
  display: flex;
  background-color: var(--white);
  border-radius: 4px;
  border: 1px solid;
  border-color: var(--gray-nurse);

  &.search-field.search-field-1 {
    margin-right: 1px;
    margin-left: unset;
  }
`;

const Content = styled.div`
  margin-left: 14px;
  margin-right: 14px;
  flex: 1;
  width: 353px;
  display: flex;
  gap: 9px;
  border: 1px none;
`;

const IconSearch = styled.img`
  margin-top: 2px;
  height: 24px;
  width: 24px;
  align-self: center;
`;

const LabelText = styled.div`
  ${ValignTextMiddle}
  ${RobotoNormalLicorice16px}
            margin-top: 17px;
  margin-bottom: 15px;
  margin-right: 40px;
  flex: 1;
  letter-spacing: 0.5px;
  line-height: 24px;
  white-space: nowrap;
`;

export default SearchField;
