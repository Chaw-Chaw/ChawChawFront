import { Section } from "./components/Section";
import styled, { css } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;
const ScrollBanner: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Section
          icon="🤳"
          title="Profile"
          subtitle="어떤 사진이든`여러분의 프로필을 올리세요"
          color="#911E93"
          content="
          여러분의 프로필이 곧 여러분의 포스팅이 됩니다.`
          매력있는 사진으로 원하는 언어를 주고 받으세요.원하는 언어와 국적, 관심있을 소개글로`
          ‘나’ 를 어필해 보세요
          "
        />
      </Wrapper>
      <Wrapper>
        <Section
          icon="📮"
          title="Posting"
          subtitle="프로필을 공개하세요`
          여러분의 포스팅 조회가 많을수록`
          매력도가 증가합니다."
          color="#EF2121"
          content="
          여러분의 프로필이 곧 여러분의 포스팅이 됩니다.`
          매력있는 사진으로 원하는 언어를 주고 받으세요.`
          원하는 언어와 국적, 관심있을 소개글로` 
          ‘나’ 를 어필해 보세요
          "
        />
      </Wrapper>
      <Wrapper>
        <Section
          icon="📱"
          title="Chat"
          subtitle="상대방에게 대화를 요청해보세요`분명 새로운 언어의 시작이 될거에요."
          color="#1E9323"
          content="
          여러분의 프로필이 곧 여러분의 포스팅이 됩니다.`
          매력있는 사진으로 원하는 언어를 주고 받으세요. `
          
          원하는 언어와 국적, 관심있을 소개글로 `
          ‘나’ 를 어필해 보세요`
          "
        />
      </Wrapper>
    </Container>
  );
};

export { ScrollBanner };
