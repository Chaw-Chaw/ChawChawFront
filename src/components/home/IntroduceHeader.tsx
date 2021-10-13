import styled, { ThemeContext } from "styled-components";
import { FaArrowCircleRight, FaFacebookF } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import { ImageSection } from "./ImageSection";
import { Button, ThemeToggle } from "../common";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../store/AuthContext";

const IntroduceHeader: React.FC = () => {
  const { isLogin } = useContext(AuthContext);
  const { id, setTheme } = useContext(ThemeContext);
  const router = useRouter();
  return (
    <IntroduceHeadLine>
      <HeadLineContent>
        <HeadLineLogoWord>차우차우</HeadLineLogoWord>
      </HeadLineContent>
      <ThemeToggleBox>
        <ThemeToggle isActive={id === "dark"} onToggle={setTheme} />
      </ThemeToggleBox>
      <HeadLineContent>
        <HeadLineStart
          onClick={(e) => {
            e.preventDefault();
            if (isLogin) {
              router.push("/post");
            } else {
              router.push("/account/login");
            }
          }}
        >
          <HeadLineLogoWord>시작하기</HeadLineLogoWord>
          <FaArrowCircleRight />
        </HeadLineStart>
      </HeadLineContent>
    </IntroduceHeadLine>
  );
};

export { IntroduceHeader };

const IntroduceHeadLine = styled.div`
  position: fixed;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  z-index: 30;
  top: 0px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  /* border-top: 1.5px solid
    ${(props) =>
    props.theme.id === "light"
      ? "rgba(0, 0, 0, 0.05)"
      : "rgba(255,255,255,0.3)"}; */
  border-bottom: 1.5px solid ${(props) => props.theme.secondaryColor};
`;

const HeadLineContent = styled.div`
  margin: 0px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100%;
`;

const HeadLineLogoWord = styled.span`
  font-size: 1.2rem;
`;

const HeadLineStart = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.5s;
  :hover {
    color: ${(props) => props.theme.visitedColor};
    text-decoration: underline;
  }
`;
const ThemeToggleBox = styled(HeadLineContent)`
  margin: 0px;
  margin-left: auto;
`;
