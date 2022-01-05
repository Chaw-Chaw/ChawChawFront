import React from "react";
import styled from "styled-components";
import { FormLabel } from "../../common/FormLabel";
import { PostModalInfoTitle } from "./PostModalInfoList";

const MPostModalContent: React.FC<{ content: string }> = (props) => {
  return (
    <PostModalInfoListBox>
      <PostModalInfoTitle>Content</PostModalInfoTitle>
      <PostModalContentBox>
        <PostModalContentText
          id="postModalContent"
          disabled
          value={props.content}
        />
        <FormLabel htmlFor="postModalContent">포스트 모달 내용</FormLabel>
      </PostModalContentBox>
    </PostModalInfoListBox>
  );
};

const PostModalContent = React.memo(MPostModalContent);
export { PostModalContent };

const PostModalInfoListBox = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const PostModalContentBox = styled.div`
  margin-top: 10px;
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  min-height: 150px;
  max-height: 150px;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  font-weight: 400;
  font-size: 0.9rem;
`;

const PostModalContentText = styled.textarea`
  width: 100%;
  color: ${(props) => (props.theme.id === "light" ? "black" : "white")};
  height: 100%;
  font-size: 1rem;
  resize: none;
  box-sizing: border-box;
  font-family: "Source Sans Pro";
  border: 2px solid ${(props) => props.theme.primaryColor};
  border-radius: 10px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
`;
