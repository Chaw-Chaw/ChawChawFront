import styled from "styled-components";
import { GoPrimitiveDot } from "react-icons/go";
import Link from "next/link";

const ToggleListItem: React.FC<{ title: string; type: string }> = (props) => {
  return (
    <ToggleListItemBox>
      <GoPrimitiveDot />
      <ToggleListItemTitle>{props.title}</ToggleListItemTitle>
    </ToggleListItemBox>
  );
};
export { ToggleListItem };

const ToggleListItemBox = styled.div`
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  svg {
    font-size: 20px;
  }
`;

const ToggleListItemTitle = styled.span``;
