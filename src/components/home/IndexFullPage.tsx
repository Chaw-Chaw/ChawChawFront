import ReactFullpage from "@fullpage/react-fullpage";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

  const moveTop = useCallback(() => {
    fullpageApiRef.current.moveTo(1, 0);
  }, []);

  useEffect(() => {
    if (id === "light") {
      setSectionColor("white");
    } else {
      setSectionColor("#4b4b4b");
    }
  }, [id]);

  const sectionsColor = useMemo(
    () => [sectionColor, "orange", "#ffaf40"],
    [sectionColor]
  );

  const slideSection = USEAGE_INFO.map((item) => {
    return (
      <ul key={item.title} className="slide">
        <UsageSlide
          title={item.title}
          subtitle={item.subtitle}
          src={item.src}
        />
      </ul>
    );
  });

  return (
    <>
      <IntroduceHeader moveTop={moveTop} />
      <ReactFullpage
        scrollOverflow={true}
        sectionsColor={sectionsColor}
        render={({ fullpageApi }: { fullpageApi: any }) => {
          fullpageApiRef.current = fullpageApi;
          return (
            <Layout>
              <Wrapper id="fullpage-wrapper">
                <Section className="section section1">
                  <Introduce />
                </Section>
                <Section className="section">{slideSection}</Section>
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
