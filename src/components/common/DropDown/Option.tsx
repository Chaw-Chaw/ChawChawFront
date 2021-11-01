import { MouseEventHandler } from "react";
import styled from "styled-components";

const Option: React.FC<{
  saveInfo: (item: string) => void;
  item: string;
}> = (props) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (props.item) {
      props.saveInfo(props.item);
    }
  };
  return <OptionBox onClick={handleClick}>{props.item}</OptionBox>;
};

export { Option };

const OptionBox = styled.div`
  border-radius: 10px;
  padding: 4px 8px;
  display: flex;
  background: ${(props) => props.theme.bodyBackgroundColor};
  transition: background-color 0.3s;
  :hover {
    background-color: ${(props) => props.theme.primaryColor};
    color: white;
  }
`;
