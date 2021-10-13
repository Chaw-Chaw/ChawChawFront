import ReactFullpage from "@fullpage/react-fullpage";
import { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { USEAGE_INFO } from "../../constants";
import { Layout } from "../common";
import { Introduce } from "./Introduce";
import { StatisticsChartSection } from "./StatisticsChartSection";
import { UsageSlide } from "./UsageSlide";

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
      sectionsColor={[sectionColor, "orange", "#ffaf40"]}
      render={({ fullpageApi }: { fullpageApi: any }) => {
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
                <StatisticsChartSection
                  moveTop={() => fullpageApi.moveTo(1, 0)}
                />
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
