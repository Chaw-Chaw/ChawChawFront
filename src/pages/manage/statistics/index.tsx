import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ManageLayout } from "../../../components/manage/ManageLayout";
import { useChart } from "../../../hooks/useChart";
import { Line } from "react-chartjs-2";
import { CHART_SUBJECT, INIT_LINE_CHART_DATA } from "../../../constants";
import { LoadingSpinnerContainer } from "../../../components/home/StatisticsChartSection";
import { LoadingSpinner } from "../../../components/common";

export default function ManageStaticis() {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const { getChartData } = useChart();
  const [chartData, setChartData] = useState(INIT_LINE_CHART_DATA);
  const router = useRouter();

  const changeChartData = async (subject: string) => {
    setIsLoading(true);
    const data = await getChartData(subject);
    setChartData((pre) => {
      const result = pre;
      result.labels = data.labels;
      result.datasets[0].data = data.datasets[0].data;
      result.datasets[0].label = CHART_SUBJECT[subject].subtitle;
      return result;
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (JSON.stringify(router.query) === JSON.stringify({})) return;
    const tmpType = router.query.type;
    const tmpTitle = String(router.query.title);
    if (tmpType === undefined && tmpTitle === undefined) return;
    setTitle(tmpTitle);
    (async () => {
      await changeChartData(String(tmpType));
    })();
  }, [JSON.stringify(router.query)]);

  return (
    <ManageLayout>
      <Container>
        <StatisticsHeader>
          <StatisticsTitle>{title}</StatisticsTitle>
        </StatisticsHeader>
        <StatisticsChart>
          {isLoading ? (
            <LoadingSpinnerContainer>
              <LoadingSpinner />
            </LoadingSpinnerContainer>
          ) : (
            <Line
              data={chartData}
              width={300}
              height={300}
              options={{ maintainAspectRatio: false }}
            />
          )}
        </StatisticsChart>
      </Container>
    </ManageLayout>
  );
}

const Container = styled.div`
  margin: 40px auto 0px auto;
  width: calc(100% - 350px);
  box-sizing: border-box;
`;

const StatisticsHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StatisticsTitle = styled.h1`
  margin: 0px;
  padding: 0px; ;
`;

const StatisticsChart = styled.div`
  margin-top: 60px;
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center; ;
`;
