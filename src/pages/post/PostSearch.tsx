import styled from "styled-components";
import { Input, Button } from "../../components/common";
import { IoIosSearch } from "react-icons/io";
import React, { useState } from "react";

const PostSearchBox = styled.div`
  border: 1px solid ${(props) => props.theme.primaryColor};
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  border-radius: 20rem;
  margin: 100px 0px 0px 0px;
  width: 100%;
  height: 50px;
  display: flex;
`;

const SearchIconBox = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 20rem;
  border-bottom-left-radius: 20rem;
  border: none;
  margin-left: 5px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  height: 45px;
  svg {
    font-size: 2.2rem;
  }
`;
const SearchInput = styled(Input)`
  border: none;
  border-radius: 0px;
  height: 50px;
  :focus {
    border: none;
  }
`;

const SearchButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 80px;
  border: none;
  border-left: 1px solid ${(props) => props.theme.primaryColor};
  box-shadow: none;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  color: ${(props) => props.theme.bodyFontColor};
`;
const PostSearch: React.FC = () => {
  return (
    <PostSearchBox>
      <SearchIconBox>
        <IoIosSearch />
      </SearchIconBox>
      <SearchInput />
      <SearchButton secondary>
        <span>search</span>
      </SearchButton>
    </PostSearchBox>
  );
};

export default PostSearch;
