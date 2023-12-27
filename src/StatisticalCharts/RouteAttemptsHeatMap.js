import { ContributionGraph } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import { chartConfig, chartHeight, chartWidth } from "./DefaultConfig";
import { fetchAttemptsAmountWithDatesAndCorrespondingRouteIDs } from "../databaseFunctions/Routes";
const mergeChartData = (data) => {
    const mergedData = [];
  
    data.forEach((entry) => {
      const existingEntry = mergedData.find((item) => item.date === entry.date);
  
      if (existingEntry) {
        existingEntry.count += entry.count;
      } else {
        mergedData.push({ date: entry.date, count: entry.count });
      }
    });
  
    return mergedData;
  };
const fetchChartData = async (gymID) => {
    const chartData = await fetchAttemptsAmountWithDatesAndCorrespondingRouteIDs(gymID);
    const routeChartData = [];
    chartData.forEach((routeAttemptsData) => {
        const attemptsCountByDate = routeAttemptsData.attemptsCountByDate;

        for (const date in attemptsCountByDate) {
            routeChartData.push({
                date: date,
                count: attemptsCountByDate[date]
            });
        }
        console.log("routeChartData", routeChartData);
    });
    const mergedRouteChartData = mergeChartData(routeChartData);
    return mergedRouteChartData;
};
export const RouteAttemptsHeatMap = ({ gymID }) => {
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        if (gymID) {
            const fetchData = async () => {
                const fetchedChartData = await fetchChartData(gymID);
                console.log("in Use Effect data", fetchedChartData);
                setChartData(fetchedChartData);
            }
            fetchData();
        }
    }, [gymID]);
    const style = {
        marginLeft: "5%"
    }

    return (
        <ContributionGraph
            values={chartData}
            endDate={new Date()}
            numDays={92}
            width={chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
            style={style}
        />
    )
};

