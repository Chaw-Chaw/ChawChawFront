import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ManageLayout } from "../../../components/manage/ManageLayout";
import { Line } from "react-chartjs-2";
import { CHART_SUBJECT, INIT_LINE_CHART_DATA } from "../../../constants";
import { LoadingSpinnerContainer } from "../../../components/home/StatisticsChartSection";
import { LoadingSpinner } from "../../../components/common";
import { useAppDispatch } from "../../../hooks/redux";
import { getChartData } from "../../../store/chartSlice";

export default function ManageStaticis() {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  const [chartData, setChartData] = useState(INIT_LINE_CHART_DATA);
  const router = useRouter();
  const routerQuery = JSON.stringify(router.query);
  const tmpType = router.query.type?.toString();
  const tmpTitle = router.query.title?.toString();

  const changeChartData = useCallback(
    async (subject: string) => {
      setIsLoading(true);
      const data = await dispatch(getChartData(subject)).unwrap();
      setChartData((pre) => {
        const result = pre;
        result.labels = data.labels;
        result.datasets[0].data = data.datasets[0].data;
        result.datasets[0].label = CHART_SUBJECT[subject].subtitle;
        return result;
      });
      setIsLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    if (routerQuery === JSON.stringify({})) return;
    if (tmpType && tmpTitle) {
      setTitle(tmpTitle);
      (async () => {
        await changeChartData(tmpType);
      })();
    }
  }, [routerQuery, changeChartData, tmpType, tmpTitle]);

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
