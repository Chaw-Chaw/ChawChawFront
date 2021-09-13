import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface ProfileListItemProps {
  title?: string;
  description?: string;
  setValues?: Dispatch<SetStateAction<string[]>>;
  values?: string[];
}

const ProfileListItem: React.FC<ProfileListItemProps> = (props) => {
  return (
    <Container>
      <ListHeader>
        <ProfileTitle>{props.title}</ProfileTitle>
        {props.children}
      </ListHeader>
      <ProfileDescription>{props.description}</ProfileDescription>
    </Container>
  );
};

export { ProfileListItem };
export type { ProfileListItemProps };

const Container = styled.div`
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid
    ${(props) => (props.theme.id === "light" ? "rgb(0, 0, 0, 0.2)" : "white")};
  width: 100%;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const ProfileTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  width: 200px;
  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
`;

const ListHeader = styled.div`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProfileDescription = styled.span`
  font-size: 1rem;
  color: ${(props) =>
    props.theme.id === "light" ? "rgb(0, 0, 0, 0.5)" : "white"};
`;
