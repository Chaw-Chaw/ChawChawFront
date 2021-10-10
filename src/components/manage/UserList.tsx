import styled from "styled-components";

const UserList: React.FC = () => {
  return (
    <UserListContainer>
      <UserListBox></UserListBox>
    </UserListContainer>
  );
};

export { UserList };

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const UserListBox = styled.div`
  width: 100%;
  height: 70vh;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.primaryColor};
`;
