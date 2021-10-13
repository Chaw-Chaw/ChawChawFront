import styled from "styled-components";
import { Layout } from "../components/common";
import { Banner } from "../components/home/Banner";
import { IndexFullPage } from "../components/home/IndexFullPage";
import { Introduce } from "../components/home/Introduce";
import { IntroduceHeader } from "../components/home/IntroduceHeader";
import { ScrollBanner } from "../components/home/ScrollBanner";

export default function Home() {
  return (
    <>
      <IntroduceHeader />
      <IndexFullPage />
    </>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  scroll-snap-type: y mandatory;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0px;
  }
`;
