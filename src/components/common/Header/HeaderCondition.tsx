import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { Button } from "../Button/Button";
import { HeaderProps } from ".";
import MyImage from "./MyImage";
import { DEFAULT_PROFILE_IMAGE } from "../../../constants";
import styled from "styled-components";

const HeaderCondition: React.FC<HeaderProps> = (props) => {
  const headerType = props.type;
  const { user, accessToken } = useContext(AuthContext);
  const profileImage = user?.imageUrl || DEFAULT_PROFILE_IMAGE;
  // token이 없는게 문제다.
  if (accessToken) {
    return <MyImage profileImage={profileImage} />;
  }

  if (headerType === "login") {
    return (
      <Link href="/account/signup/webMailAuth">
        <a>
          <ButtonOutline>
            <Button>Signup</Button>
          </ButtonOutline>
        </a>
      </Link>
    );
  }

  return (
    <Link href="/account/login">
      <a>
        <ButtonOutline>
          <Button>Login</Button>
        </ButtonOutline>
      </a>
    </Link>
  );
};

export default HeaderCondition;

const ButtonOutline = styled.div`
  border-radius: 20rem;
  @media (max-width: 768px) {
    border: 1px solid white;
    button {
      box-shadow: none;
    }
  }
`;
