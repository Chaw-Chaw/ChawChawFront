import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { Button } from "../Button/Button";
import MyImage from "./MyImage";
import { DEFAULT_PROFILE_IMAGE } from "../../../constants";
import styled from "styled-components";
import { PushAlarm } from "./PushAlarm";
import { useRouter } from "next/router";
import {
  LOGIN_PAGE_URL,
  SIGNUP_WEBMAIL_AUTH_PAGE_URL,
} from "../../../constants/pageUrls";

const HeaderCondition: React.FC = () => {
  const { user, isLogin } = useContext(AuthContext);
  const [viewUserImage, setViewUserImage] = useState(false);
  const profileImage = user?.imageUrl || DEFAULT_PROFILE_IMAGE;
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      setViewUserImage(true);
    } else {
      setViewUserImage(false);
    }
  }, [isLogin]);

  const userImage = (
    <HeaderInfoBox>
      <PushAlarm />
      <MyImage profileImage={profileImage} />
    </HeaderInfoBox>
  );

  const loginButton = (
    <Link
      href={
        router.pathname === LOGIN_PAGE_URL
          ? LOGIN_PAGE_URL
          : SIGNUP_WEBMAIL_AUTH_PAGE_URL
      }
    >
      <a>
        <ButtonOutline>
          <Button>
            {router.pathname === LOGIN_PAGE_URL ? "Login" : "Signup"}
          </Button>
        </ButtonOutline>
      </a>
    </Link>
  );

  return viewUserImage ? userImage : loginButton;
};

export default HeaderCondition;

const HeaderInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonOutline = styled.div`
  border-radius: 20rem;
  @media (max-width: 768px) {
    border: 1px solid white;
    button {
      box-shadow: none;
    }
  }
`;
