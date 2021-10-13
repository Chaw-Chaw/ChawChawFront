import { useContext, useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import styled from "styled-components";
import { StatisticsContext } from "../../store/StatisticsContext";
import { LoadingSpinner, SelectInfoDropDown } from "../common";

const initialChartData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(48, 57, 82,1)",
        "rgba(243, 166, 131,1)",
        "rgba(225, 95, 65,1)",
        "rgba(119, 139, 235,1)",
      ],
      borderColor: ["white"],
      borderWidth: 1,
    },
  ],
};

const typeOptions: string[] = [
  "학교 활성도 순위",
  "희망 언어 순위",
  "할 수 있는 언어 순위",
  "인기 검색 언어 순위",
];

const StatisticsChartSection: React.FC<{ moveTop: () => void }> = (props) => {
  const {
    getRankSchool,
    getRankHopeLanguage,
    getRankVisitedLanguage,
    getRankLanguage,
  } = useContext(StatisticsContext);

  const [chartData, setChartData] = useState(initialChartData);
  const [type, setType] = useState<string[]>(["학교 활성도 순위"]);
  const [title, setTitle] = useState("학교 활성도 순위");
  const [subtitle, setSubtitle] = useState("유저 수");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (type[0] === "") return;
    (async () => {
      if (type[0] === "학교 활성도 순위") {
        const result = await getRankSchool();
        if (!result) {
          setIsLoading(true);
          return;
        }
        const tmpChartData = JSON.parse(JSON.stringify(initialChartData));
        tmpChartData.labels = result.labels;
        tmpChartData.datasets[0].data = result.data;
        setSubtitle("유저 수");
        setChartData(tmpChartData);
        setIsLoading(false);
        return;
      }
      if (type[0] === "희망 언어 순위") {
        const result = await getRankLanguage();
        if (!result) {
          setIsLoading(true);
          return;
        }
        const tmpChartData = JSON.parse(JSON.stringify(initialChartData));
        tmpChartData.labels = result.labels;
        tmpChartData.datasets[0].data = result.data;
        setSubtitle("해당 언어를 사용할 수 있는 유저 수");
        setChartData(tmpChartData);
        setIsLoading(false);
        return;
      }
      if (type[0] === "할 수 있는 언어 순위") {
        const result = await getRankHopeLanguage();
        if (!result) {
          setIsLoading(true);
          return;
        }
        const tmpChartData = JSON.parse(JSON.stringify(initialChartData));
        tmpChartData.labels = result.labels;
        tmpChartData.datasets[0].data = result.data;
        setSubtitle("해당 언어 배우길 희망하는 유저 수");
        setChartData(tmpChartData);
        setIsLoading(false);
        return;
      }
      if (type[0] === "인기 검색 언어 순위") {
        const result = await getRankVisitedLanguage();
        if (!result) {
          setIsLoading(true);
          return;
        }
        const tmpChartData = JSON.parse(JSON.stringify(initialChartData));
        tmpChartData.labels = result.labels;
        tmpChartData.datasets[0].data = result.data;
        setSubtitle("해당 언어를 검색한 유저 수");
        setChartData(tmpChartData);
        setIsLoading(false);
        return;
      }
      console.log("타입이 존재하지 않음");
    })();
  }, [type]);

  return (
    <Container>
      <ChartSection>
        <StatisticsHeader>
          <StatisticsTitle>{title}</StatisticsTitle>
          <StatisticsSubHeader>
            <StatisticsSubtitle>{"기준 : " + subtitle}</StatisticsSubtitle>
            <SelectInfoDropDown
              search
              backgroundColor="white"
              width="150px"
              color="#FF8A00"
              initialValue="차트 타입"
              fontSize="0.9rem"
              setValues={setType}
              index={0}
              options={typeOptions}
              value={type[0]}
            />
          </StatisticsSubHeader>
        </StatisticsHeader>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <StatisticsChart>
            <Doughnut
              data={chartData}
              width={300}
              height={300}
              options={{ maintainAspectRatio: false }}
            />
          </StatisticsChart>
        )}
      </ChartSection>
    </Container>
  );
};

export { StatisticsChartSection };

const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  overflow: hidden;
`;

const StatisticsHeader = styled.div`
  margin-top: 30px;
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
