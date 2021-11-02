import styled from "styled-components";
import { GoPrimitiveDot } from "react-icons/go";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

const ToggleListItem: React.FC<{ title: string; type: string; link: string }> =
  (props) => {
    const router = useRouter();
    const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
      e.preventDefault();
      if (props.type === "userSearch") {
        router.push(props.link);
        return;
      }
      router.push({
        pathname: props.link,
        query: { type: props.type, title: props.title },
      });
      return;
    };
    return (
      <ToggleListItemBox onClick={handleClick}>
        <GoPrimitiveDot />
        <ToggleListItemTitle>{props.title}</ToggleListItemTitle>
      </ToggleListItemBox>
    );
  };
export { ToggleListItem };

const ToggleListItemBox = styled.li`
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;

  svg {
    font-size: 20px;
  }
`;

const ToggleListItemTitle = styled.span``;
