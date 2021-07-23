import styled from "styled-components";
import { Input, TextArea } from "../common/Input";

const InputBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: absolute;
  bottom: 0%;
  margin: 0px;
`;

const InputBoxInner = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;

const TextInput = styled(TextArea)`
  height: 50px;
  padding: 10px 120px 10px 15px;
  margin: 0px;
  overflow: auto;
  resize: none;
`;

const MessageInput: React.FC = () => {
  return (
    <InputBox>
      <InputBoxInner>
        <TextInput placeholder="메세지를 입력해주세요." autoFocus></TextInput>
      </InputBoxInner>
    </InputBox>
  );
};

export { MessageInput };
