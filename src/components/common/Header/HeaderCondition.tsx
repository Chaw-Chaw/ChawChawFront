import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../store/AuthContext";
import { Button } from "../Button/Button";
import { HeaderProps } from ".";
import MyImage from "./MyImage";
import { DEFAULT_PROFILE_IMAGE } from "../../../constants";
import { useCookies } from "react-cookie";

const HeaderCondition: React.FC<HeaderProps> = (props) => {
  const headerType = props.type;
  const { user } = useContext(AuthContext);
  const [cookies] = useCookies(["accessToken"]);
  const profileImage = user?.imageUrl || DEFAULT_PROFILE_IMAGE;
  // token이 없는게 문제다.
  if (cookies.accessToken) {
    return <MyImage profileImage={profileImage} />;
  }

  if (headerType === "login") {
    return (
      <Link href="/account/signup/webMailAuth">
        <a>
          <Button>Signup</Button>
        </a>
      </Link>
    );
  }

  return (
    <Link href="/account/login">
      <a>
        <Button>Login</Button>
      </a>
    </Link>
  );
};

export default HeaderCondition;
