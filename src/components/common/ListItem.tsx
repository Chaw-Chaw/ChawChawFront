import styled from "styled-components";
import React from "react";

interface ListItemProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const MListItem: React.FC<ListItemProps> = (props) => {
  return (
    <Container>
      <ListHeader>
        <Title>{props.title}</Title>
        {props.children}
      </ListHeader>
      <Description>{props.description}</Description>
    </Container>
  );
};
const ListItem = React.memo(MListItem);
export { ListItem };
export type { ListItemProps };

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
const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  width: 200px;
  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
`;

const ListHeader = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Description = styled.span`
  font-size: 1rem;
  color: ${(props) =>
    props.theme.id === "light" ? "rgb(0, 0, 0, 0.5)" : "white"};
`;
