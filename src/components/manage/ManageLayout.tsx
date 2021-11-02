import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useAlert } from "react-alert";
import styled from "styled-components";
import { DEFAULT_PROFILE_IMAGE, MAIN_PAGE } from "../../constants";
import { AuthContext } from "../../store/AuthContext";
import { getSecureLocalStorage } from "../../utils";
import { TapList } from "./TapList";

const ManageLayout: React.FC = (props) => {
  const { user, isLogin } = useContext(AuthContext);
  const router = useRouter();
  const message = useAlert();
  const profileImage = user?.imageUrl || DEFAULT_PROFILE_IMAGE;

  useEffect(() => {
    if (!isLogin) return;
    const userRole = getSecureLocalStorage("user").role;
    if (userRole !== "ADMIN") {
      message.error("유저 아이디로 서비스를 이용할 수 없습니다.", {
        onClose: () => {
          router.push(MAIN_PAGE);
        },
      });
    }
  }, []);

  return (
    <>
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
      <GuideText>
        <p>데스크 탑 화면을 키워주세요.</p>
      </GuideText>
    </>
  );
};
export { ManageLayout };

const Container = styled.div`
  display: flex;
  height: 100vh;
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
  width: 100%;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Tap = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  width: 300px;
  box-sizing: border-box;
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

const GuideText = styled.div`
  display: none;
  @media (max-width: 1024px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
