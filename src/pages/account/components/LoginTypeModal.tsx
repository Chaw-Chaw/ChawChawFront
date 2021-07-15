import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { ModalLayout, Button } from "../../../components/common";
import KaKaoLogin from "react-kakao-login";
import FacebookLogin from "@greatsumini/react-facebook-login";

interface LoginTypeModalProps {
  visible: boolean;
  onClick: () => void;
}

const Container = styled.div`
  width: 500px;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 50px;
`;

const ButtonSection = styled.div`
  width: 100%;
`;
const socialLogin = {
  cursor: "pointer",
  textTransform: "none",
  width: "100%",
  height: "60px",
  border: "none",
  color: "white",
  touchAction: "manipulation",
  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.5)",
  textAlign: "center",
  fontWeight: "600",
  fontSize: "1.5rem",
  borderRadius: "20rem",
  margin: "10px 0",
};
const styleKakaoLogin = {
  ...socialLogin,
  background: "#FEE100",
};

const styleFacebookLogin = {
  ...socialLogin,
  background: "#3577E5",
};

const LoginTypeModal: React.FC<LoginTypeModalProps> = (props) => {
  return (
    <ModalLayout visible={props.visible} onClick={props.onClick}>
      <Container>
        <Title>회원가입 방법을 선택해주세요.</Title>
        <ButtonSection>
          <Link href="/account/signup">
            <a>
              <Button width="100%" height="60px" fontSize="1.5rem">
                개인 계정 로그인
              </Button>
            </a>
          </Link>
        </ButtonSection>
        <KaKaoLogin style={styleKakaoLogin}>KaKao 로그인</KaKaoLogin>
        <FacebookLogin
          style={styleFacebookLogin}
          appId="1088597931155576"
          onSuccess={(response) => {
            console.log("Login Success!");
            //console.log("id: ", response.id);
          }}
          onFail={(error) => {
            console.log("Login Failed!");
            console.log("status: ", error.status);
          }}
          onProfileSuccess={(response) => {
            console.log("Get Profile Success!");
            //console.log("name: ", response.name);
          }}
        >
          Facebook 로그인
        </FacebookLogin>
      </Container>
    </ModalLayout>
  );
};

export default LoginTypeModal;
