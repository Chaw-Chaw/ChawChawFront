import {
  useState,
  useRef,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import { TextArea, Label, UpdateButton } from "../../common";

interface ProfileContentProps {
  placeholder?: string;
  title?: string;
  setValues: Dispatch<SetStateAction<string>>;
  values: string;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  @media (max-width: 768px) {
    margin: 10px auto;
  }
`;
const Title = styled(Label)`
  font-size: 1.2rem;
`;
const Content = styled(TextArea)<{ isActive?: boolean }>`
  font-size: 1rem;
  border: ${(props) => (props.isActive ? "2px solid orange" : "none")};
  width: 400px;
  @media (max-width: 500px) {
    width: calc(100% - 50px);
  }
  resize: none;
  min-height: 10px;
  max-height: 230px;
  box-sizing: border-box;
`;

const ProfileContent: React.FC<ProfileContentProps> = (props) => {
  const textAreaResizHandle = () => {
    if (textAreaRef === null || textAreaRef.current === null) return;
    textAreaRef.current.style.height = "10px";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    // console.log(
    //   textAreaRef?.current.value.replace(/(?:\r\n|\r|\n)/g, "<br />")
    // );
  };
  const [isActive, setIsActive] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textAreaResize = useCallback(textAreaResizHandle, []);

  useEffect(textAreaResizHandle, []);
  return (
    <Container>
      <Title htmlFor="content">{props.title}</Title>
      <Content
        // type="text"
        id="content"
        isActive={isActive}
        disabled={!isActive}
        placeholder={props.placeholder}
        ref={textAreaRef}
        onInput={textAreaResize}
      />
      <UpdateButton
        onClick={() => {
          setIsActive((isActive) => !isActive);
          const content = textAreaRef.current;
          if (textAreaRef === null || content === null) return;
          if (isActive) {
            props.setValues(() => {
              return content.value;
            });
          }
          // props.update
        }}
      >
        {isActive ? "업데이트" : "수정"}
      </UpdateButton>
    </Container>
  );
};

export { ProfileContent };
