import styled from "styled-components";

const EmptyAlarm: React.FC<{ title: string }> = (props) => {
  return (
    <EmptyNewMessageMark>
      <span>{props.title}</span>
    </EmptyNewMessageMark>
  );
};

export { EmptyAlarm };

const EmptyNewMessageMark = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.bodyFontColor};
  svg {
    margin-right: 10px;
    color: ${(props) => props.theme.bodyFontColor};
    font-size: 2rem;
  }
  span {
    font-size: 1.5rem;
  }
`;
