import ReactFullpage from "@fullpage/react-fullpage";
import { useContext, useEffect, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { USEAGE_INFO } from "../../constants";
import { Layout } from "../common";
import { Introduce } from "./Introduce";
import { IntroduceHeader } from "./IntroduceHeader";
import { StatisticsChartSection } from "./StatisticsChartSection";
import { UsageSlide } from "./UsageSlide";

const IndexFullPage: React.FC = () => {
  const { id } = useContext(ThemeContext);
  const [sectionColor, setSectionColor] = useState("white");
  const fullpageApiRef = useRef<any>({});

  const moveTop = () => {
    fullpageApiRef.current.moveTo(1, 0);
  };

  useEffect(() => {
    if (id === "light") {
      setSectionColor("white");
    } else {
      setSectionColor("#4b4b4b");
    }
  }, [id]);
  return (
    <>
      <IntroduceHeader moveTop={moveTop} />
      <ReactFullpage
        scrollOverflow={true}
        sectionsColor={[sectionColor, "orange", "#ffaf40"]}
        render={({ fullpageApi }: { fullpageApi: any }) => {
          fullpageApiRef.current = fullpageApi;
          return (
            <Layout>
              <Wrapper id="fullpage-wrapper">
                <Section className="section section1">
                  <Introduce />
                </Section>
                <Section className="section">
                  {USEAGE_INFO.map((item, index) => {
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
                  <StatisticsChartSection />
                </Section>
              </Wrapper>
            </Layout>
          );
        }}
      />
    </>
  );
};

export { IndexFullPage };

const Wrapper = styled.div``;
const Section = styled.div``;
