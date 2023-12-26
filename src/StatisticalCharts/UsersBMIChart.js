import { PieChart } from "react-native-chart-kit";
import { chartConfig, chartHeight, chartWidth } from "./DefaultConfig";
import { Spinner } from "native-base";
import { useEffect, useState } from "react";
import { extractUsersBMI } from "../components/AdminUsersPanel/AdminUsersPanelFunctions";
export const UsersBMIChart = () => {
    const [underweightCount, setUnderweightCount] = useState(1);
    const [normalCount, setNormalCount] = useState(2);
    const [overweightCount, setOverweightCount] = useState(3);
    const [obeseCount, setObeseCount] = useState(4);
    const [dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await extractUsersBMI();
            setUnderweightCount(fetchedData.underweight);
            setNormalCount(fetchedData.normal);
            setOverweightCount(fetchedData.overweight);
            setObeseCount(fetchedData.obese);
            setDataLoaded(true);
        }
        fetchData();
    }, []);
    let data = [
        {
            name: "Underweight",
            population: underweightCount,
            color: "#EEB959",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Normal",
            population: normalCount,
            color: "#424242",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Overweight",
            population: overweightCount,
            color: "#987768",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Obese",
            population: obeseCount,
            color: "#6d5e5c",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];
    if (!dataLoaded) {
        return (
            <Spinner accessibilityLabel="Loading user info"
                color="#EEB959"
                size="lg"
            />
        )
    }
    else {
        return (
            <PieChart
                data={data}
                width={chartWidth}
                height={chartHeight}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[0, 0]}
                absolute
            />
        )
    }
};