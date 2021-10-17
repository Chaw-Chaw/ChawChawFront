import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ManageLayout } from "../../../components/manage/ManageLayout";
import { StatisticsContext } from "../../../store/StatisticsContext";
import { Line } from "react-chartjs-2";

const initialChartData = {
  labels: ["sun", "mon", "tue", "wed", "thur", "fri", "sat"],
  datasets: [
    {
      label: "유저 수",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: "rgba(255, 175, 64, 0.5)",
      borderColor: "#ffaf40",
      tension: 0.1,
    },
  ],
};

export default function ManageStaticis() {
  const {
    getRankSchool,
    getRankHopeLanguage,
    getRankVisitedLanguage,
    getRankLanguage,
  } = useContext(StatisticsContext);

  const [chartData, setChartData] = useState(initialChartData);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (JSON.stringify(router.query) === JSON.stringify({})) return;
    const tmpType = router.query.type;
    const tmpTitle = router.query.title;

    if (tmpType === undefined || tmpTitle === undefined) return;
    setType(String(tmpType));
    setTitle(String(tmpTitle));
  }, [JSON.stringify(router.query)]);

  useEffect(() => {
    if (type === "") return;
    (async () => {
      if (type === "rankSchool") {
        const result = await getRankSchool();
        if (!result) {
          setIsLoading(true);
          return;
        }
        const tmpChartData = JSON.parse(JSON.stringify(initialChartData));
        tmpChartData.labels = result.labels;
        tmpChartData.datasets[0].data = result.data;
        tmpChartData.datasets[0].label = "유저 수";
        setChartData(tmpChartData);
        setIsLoading(false);
        return;
      }
      if (type === "language") {
        const result = await getRankLanguage();
        if (!result) {
          setIsLoading(true);
          return;
        }
        const tmpChartData = JSON.parse(JSON.stringify(initialChartData));
        tmpChartData.labels = result.labels;
        tmpChartData.datasets[0].data = result.data;
        tmpChartData.datasets[0].label = "해당 언어를 사용할 수 있는 유저 수";
        setChartData(tmpChartData);
        setIsLoading(false);
        return;
      }
      if (type === "hopeLanguage") {
        const result = await getRankHopeLanguage();
        if (!result) {
          setIsLoading(true);
          return;
        }
        const tmpChartData = JSON.parse(JSON.stringify(initialChartData));
        tmpChartData.labels = result.labels;
        tmpChartData.datasets[0].data = result.data;
        tmpChartData.datasets[0].label = "해당 언어 배우길 희망하는 유저 수";
        setChartData(tmpChartData);
        setIsLoading(false);
        return;
      }
      if (type === "searchLanguage") {
        const result = await getRankVisitedLanguage();
        if (!result) {
          setIsLoading(true);
          return;
        }
        const tmpChartData = JSON.parse(JSON.stringify(initialChartData));
        tmpChartData.labels = result.labels;
        tmpChartData.datasets[0].data = result.data;
        tmpChartData.datasets[0].label = "해당 언어를 검색한 유저 수";
        setChartData(tmpChartData);
        setIsLoading(false);
        return;
      }
      console.log("타입이 존재하지 않음");
    })();
  }, [type]);

  return (
    <ManageLayout>
      <Container>
        <StatisticsHeader>
          <StatisticsTitle>{title}</StatisticsTitle>
        </StatisticsHeader>
        {!isLoading && (
          <StatisticsChart>
            <Line
              data={chartData}
              width={300}
              height={300}
              options={{ maintainAspectRatio: false }}
            />
          </StatisticsChart>
        )}
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
`;
