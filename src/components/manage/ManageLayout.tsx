import Image from "next/image";
import { useContext } from "react";
import styled from "styled-components";
import { DEFAULT_PROFILE_IMAGE } from "../../constants";
import { AuthContext } from "../../store/AuthContext";
import { TapList } from "./TapList";

const ManageLayout: React.FC = (props) => {
  const { user } = useContext(AuthContext);
  const profileImage = user?.imageUrl || DEFAULT_PROFILE_IMAGE;
  return (
    <Container>
      <Tap>
        <PageTitleBox>
          <PageTitle>ChawChaw Manage</PageTitle>
        </PageTitleBox>
        <ProfileBox>
          <ProfileImageBox>
            <Image
              src={profileImage}
              alt="프로필 이미지"
              width="50px"
              height="50px"
              objectFit="cover"
            />
          </ProfileImageBox>
          <ProfileName>{user.name}</ProfileName>
        </ProfileBox>
        <TapList />
      </Tap>
      {props.children}
    </Container>
  );
};
export { ManageLayout };

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const Tap = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100vh;
  background-color: ${(props) => props.theme.primaryColor};
  padding-left: 30px;
`;

const PageTitleBox = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
`;

const PageTitle = styled.h1`
  margin: 0px;
  padding: 0px;
  font-size: 30px;

  white-space: pre-line;
  word-break: break-all;
`;

const ProfileBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`;

const ProfileImageBox = styled.div`
  border-radius: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    border-radius: 100%;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  }
`;

const ProfileName = styled.h1`
  margin: auto 0px;
  margin-left: 25px;
  padding: 0px;
  font-size: 25px;
`;
