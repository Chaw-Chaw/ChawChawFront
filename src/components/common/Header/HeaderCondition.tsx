import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { Button } from "../Button/Button";
import MyImage from "./MyImage";
import { DEFAULT_PROFILE_IMAGE } from "../../../constants";
import styled from "styled-components";
import PushAlarm from "../PushAlarm";

const HeaderCondition: React.FC<{ type?: string }> = (props) => {
  const headerType = props.type;
  const { user, isLogin } = useContext(AuthContext);
  const profileImage = user?.imageUrl || DEFAULT_PROFILE_IMAGE;

  if (isLogin) {
    return (
      <HeaderInfoBox>
        <PushAlarm />
        <MyImage profileImage={profileImage} />
      </HeaderInfoBox>
    );
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
