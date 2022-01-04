import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import {
  CHART_SUBJECT,
  INIT_BAR_CHART_DATA,
  SUBJECT_OPTIONS,
  SUBJECT_CONVERT,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { asyncErrorHandle } from "../../store/alertSlice";
import { getChartData } from "../../store/chartSlice";
import { LoadingSpinner, SelectInfoDropDown } from "../common";

const MStatisticsChartSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const subtitle = useAppSelector((state) => state.chart.subtitle);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState(INIT_BAR_CHART_DATA);
  const [subject, setSubject] = useState<string[]>(["학교 활성도 순위"]);
  const subjectData = subject[0];

  const typeOptions = useMemo(() => Object.values(SUBJECT_OPTIONS), []);

  const changeChartData = useCallback(async () => {
    setIsLoading(true);
    const subjectKey = SUBJECT_CONVERT[subjectData];
    if (!SUBJECT_OPTIONS[subjectKey]) {
      return;
    }
    const data = await dispatch(getChartData(subjectKey)).unwrap();
    setChartData((pre) => {
      const result = pre;
      result.labels = data.labels;
      result.datasets[0].data = data.datasets[0].data;
      result.datasets[0].label = CHART_SUBJECT[subjectKey].subtitle;
      return result;
    });
    setIsLoading(false);
  }, [dispatch, subjectData]);

  useEffect(() => {
    //첫 렌더링시에는 서버에서 아래 코드를 실행시켜버리는구나
    (async () => {
      try {
        await changeChartData();
      } catch (error) {
        dispatch(asyncErrorHandle(error));
      }
    })();
  }, [subjectData, dispatch, changeChartData]);

  const lazyChart = isLoading ? (
    <LoadingSpinnerContainer>
      <LoadingSpinner />
    </LoadingSpinnerContainer>
  ) : (
    <StatisticsChart>
      <Bar
        data={chartData}
        width={300}
        height={300}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                color: "rgba(247, 241, 227,0.2)",
              },
              ticks: {
                color: "white",
              },
            },
            y: {
              grid: {
                color: "rgba(247, 241, 227,0.2)",
              },
              ticks: {
                color: "white",
              },
            },
          },
        }}
      />
    </StatisticsChart>
  );

  return (
    <Container>
      <ChartSection>
        <StatisticsHeader>
          <StatisticsTitle>{subjectData}</StatisticsTitle>
          <StatisticsSubHeader>
            <StatisticsSubtitle>{"기준 : " + subtitle}</StatisticsSubtitle>
            <SelectTypeWrapper>
              <SelectInfoDropDown
                fontWeight="900"
                type="SEARCH"
                backgroundColor="white"
                width="150px"
                height="30px"
                color="#FF8A00"
                initialValue="차트 타입"
                fontSize="0.9rem"
                setValues={setSubject}
                index={0}
                options={typeOptions}
                value={subject[0]}
              />
            </SelectTypeWrapper>
          </StatisticsSubHeader>
        </StatisticsHeader>
        {lazyChart}
      </ChartSection>
    </Container>
  );
};
const StatisticsChartSection = React.memo(MStatisticsChartSection);
export { StatisticsChartSection, LoadingSpinnerContainer };

const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;

const StatisticsHeader = styled.div`
  margin-top: 110px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StatisticsTitle = styled.h1`
  margin: 0px;
  padding: 0px;
`;

const StatisticsChart = styled.div`
  margin-top: 60px;
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartSection = styled.div`
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StatisticsSubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatisticsSubtitle = styled(StatisticsTitle)`
  margin-top: 10px;
  font-size: 1.5rem;
`;

const SelectTypeWrapper = styled.div`
  min-width: 151px;
`;

const LoadingSpinnerContainer = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.secondaryColor};
`;
