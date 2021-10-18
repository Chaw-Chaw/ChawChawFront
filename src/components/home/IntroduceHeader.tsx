import styled, { ThemeContext } from "styled-components";
import { FaArrowCircleRight } from "react-icons/fa";
import { ThemeToggle } from "../common";
import { MouseEventHandler, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../store/AuthContext";

const IntroduceHeader: React.FC<{ moveTop: () => void }> = (props) => {
  const { isLogin } = useContext(AuthContext);
  const { id, setTheme } = useContext(ThemeContext);
  const router = useRouter();

  const headLineLogoHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    props.moveTop();
  };

  return (
    <IntroduceHeadLine>
      <HeadLineContentLeft>
        <HeadLineStart onClick={headLineLogoHandler}>
          <HeadLineLogoWord>차우차우</HeadLineLogoWord>
        </HeadLineStart>
      </HeadLineContentLeft>
      <ThemeToggleBox>
        <ThemeToggle isActive={id === "dark"} onToggle={setTheme} />
      </ThemeToggleBox>
      <HeadLineContentRight>
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
      </HeadLineContentRight>
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
  border-bottom: 1.5px solid ${(props) => props.theme.secondaryColor};
`;

const HeadLineContentLeft = styled.div`
  cursor: pointer;
  margin-left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100%;
  @media (max-width: 768px) {
  }
`;

const HeadLineContentRight = styled(HeadLineContentLeft)`
  margin-left: 0px;
  margin-right: 50px;
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
const ThemeToggleBox = styled(HeadLineContentLeft)`
  margin: 0px;
  margin-left: auto;
`;
