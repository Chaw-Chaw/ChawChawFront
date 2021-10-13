import ReactFullpage from "@fullpage/react-fullpage";
import { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { Layout } from "../common";
import { Introduce } from "./Introduce";
import { StatisticsChart } from "./StatisticsChart";
import { UsageSlide } from "./UsageSlide";

const usageInfo = [
  {
    title: "무료채팅",
    subtitle:
      "인터넷이 가능한 장소라면 언제나 ChawChaw! /n1대1 채팅으로 메세지와 이미지 전송까지!, 설치 없이 인터넷만 된다면 우리학교 버디와 마음것 채팅해요!",
    src: "/Layout/chatting.png",
  },
  {
    title: "프로필",
    subtitle:
      "프로필을 통해 나를 표현하세요! /n내가 할 수 있는 언어, 소개글, SNS 주소등으로 나와 맞는 버디와 채팅해요! 💬",
    src: "/Layout/profile.png",
  },
  {
    title: "친구찾기",
    subtitle:
      "조건에 맞는 버디를 검색하고 찾아봐요. /n버디들이 만든 프로필을 살펴보고 채팅을 걸어봐요. 너무 멋진 버디가 있다면 좋아요 꾹! ❤️",
    src: "/Layout/searchPost.png",
  },
  {
    title: "언어번역",
    subtitle:
      "버디가 보낸메세지가 무슨 말이지? 내가 맞게 말한 건가? /n버디가 말한 메세지가 어떤말인지 번역하고 학습하세요. 내가 배운 언어가 의도에 맞게 전달 된건지 확인해봐요. 👀",
    src: "/Layout/translation.png",
  },
];

const IndexFullPage: React.FC = () => {
  const { id } = useContext(ThemeContext);
  const [sectionColor, setSectionColor] = useState("white");
  useEffect(() => {
    if (id === "light") {
      setSectionColor("white");
    } else {
      setSectionColor("#4b4b4b");
    }
  }, [id]);
  return (
    <ReactFullpage
      scrollOverflow={true}
      sectionsColor={[sectionColor, "orange", sectionColor]}
      render={({ fullpageApi }: { fullpageApi: any }) => {
        return (
          <Layout>
            <Wrapper id="fullpage-wrapper">
              <Section className="section section1">
                <Introduce />
              </Section>
              <Section className="section">
                {usageInfo.map((item, index) => {
                  return (
                    <div key={index} className="slide">
                      <UsageSlide
                        title={item.title}
                        subtitle={item.subtitle}
                        src={item.src}
                      />
                    </div>
                  );
                })}
              </Section>
              <Section className="section">
                <StatisticsChart />
                <button onClick={() => fullpageApi.moveTo(1, 0)}>
                  Move top
                </button>
              </Section>
            </Wrapper>
          </Layout>
        );
      }}
    />
  );
};

export { IndexFullPage };

const Wrapper = styled.div``;
const Section = styled.div``;
