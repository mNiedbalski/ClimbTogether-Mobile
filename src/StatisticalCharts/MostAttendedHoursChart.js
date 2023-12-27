import { fetchAttemptsAmountWithHours } from "../databaseFunctions/Routes";
import { useEffect, useState } from "react";
import { Spinner, Text } from 'native-base';
import { chartConfig, chartHeight, chartWidth } from "./DefaultConfig";
import { PieChart } from "react-native-chart-kit";
export const MostAttendedHoursChart = ({ gymID }) => {
    const [firstIntervalCount, setFirstIntervalCount] = useState(1);
    const [secondIntervalCount, setSecondIntervalCount] = useState(2);
    const [thirdIntervalCount, setThirdIntervalCount] = useState(3);
    const [fourthIntervalCount, setFourthIntervalCount] = useState(4);
    const [fifthIntervalCount, setFifthIntervalCount] = useState(5);
    const [dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
        if (gymID) {
            const fetchData = async () => {
                const result = await fetchAttemptsAmountWithHours(gymID);
                const attemptsCountByHourInterval = result[0].attemptsCountByHourInterval;
                setFirstIntervalCount(attemptsCountByHourInterval["7-10"]);
                setSecondIntervalCount(attemptsCountByHourInterval["10-13"]);
                setThirdIntervalCount(attemptsCountByHourInterval["13-16"]);
                setFourthIntervalCount(attemptsCountByHourInterval["16-19"]);
                setFifthIntervalCount(attemptsCountByHourInterval["19-22.5"]);
                setDataLoaded(true);
            }
            fetchData();
        }
    }, [gymID]);

    const data = [
        {
            name: "7:00-10:00",
            population: firstIntervalCount,
            color: "#EEB959",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "10:00-13:00",
            population: secondIntervalCount,
            color: "#FDFCEC",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "13:00-16:00",
            population: thirdIntervalCount,
            color: "#505151",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "16:00-19:00",
            population: fourthIntervalCount,
            color: "#EBD2C1",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "19:00-22:30",
            population: fifthIntervalCount,
            color: "#FFFFFF",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
    ];

    if (dataLoaded) {
        return (
            <PieChart
                data={data}
                width={chartWidth}
                height={chartHeight}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"5"}
                center={[0, 0]}
                absolute
            />
        )
    } else {
        return (
            <Spinner accessibilityLabel="Loading user info"
                color="#EEB959"
                size="lg"
            />
        )
    }

};