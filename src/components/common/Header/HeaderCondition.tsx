import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
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
import { useAppSelector } from "../../../hooks/redux";
import { isLogin } from "../../../utils";

const HeaderCondition: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [viewUserImage, setViewUserImage] = useState(false);
  const profileImage = user?.imageUrl || DEFAULT_PROFILE_IMAGE;
  const router = useRouter();

  useEffect(() => {
    if (isLogin()) {
      setViewUserImage(true);
    } else {
      setViewUserImage(false);
    }
  }, []);

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

export default React.memo(HeaderCondition);

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
