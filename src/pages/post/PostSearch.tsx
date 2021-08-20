import styled from "styled-components";
import { Input, Button } from "../../components/common";
import { IoIosSearch, IoMdReturnLeft } from "react-icons/io";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
interface PostSearchProps {
  setSearchName: Dispatch<SetStateAction<string>>;
  searchHandler: () => void;
}

const PostSearch: React.FC<PostSearchProps> = (props) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  return (
    <PostSearchBox>
      <SearchIconBox>
        <IoIosSearch />
      </SearchIconBox>
      <SearchInput
        onChange={(e) => {
          e.preventDefault();
          props.setSearchName(e.target.value);
        }}
      />
      <SearchButton
        secondary
        onClick={(e) => {
          e.preventDefault();
          // const searchInput = searchInputRef.current;
          // if (searchInput) {
          //   props.setSearchName((pre) => {
          //     if (searchInput) {
          //       console.log(searchInput.value, "search");
          //       return searchInput.value;
          //     } else return pre;
          //   });
          props.searchHandler();
        }}
      >
        <span>search</span>
      </SearchButton>
    </PostSearchBox>
  );
};
const PostSearchBox = styled.div`
  border: 1px solid ${(props) => props.theme.primaryColor};
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  border-radius: 20rem;
  margin-top: 100px;
  height: 50px;
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    margin-top: 0px;
  }
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
  font-family: "BMJUA";
`;

export default PostSearch;
