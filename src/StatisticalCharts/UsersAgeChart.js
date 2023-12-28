import { BarChart } from "react-native-chart-kit";
import { chartHeight, barChartConfig, barChartStyle, adjustedWidth } from './DefaultConfig';
import { useEffect, useState } from "react";
import { extractUsersAgeGroups } from "../components/AdminUsersPanel/AdminUsersPanelFunctions";

export const UsersAgeDataChart = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await extractUsersAgeGroups();
            setData(fetchedData);
        }
        fetchData();
    }, []);
    useEffect(() => {
        console.log(data);
    }, [data]);
    const testData = {
        labels: ["Under 12", "12-17", "18-24", "25-34", "35-44", "45-54", "55-74", "75 or older"],
        datasets: [
            {
                data: [data["1-12"], data["12-17"], data["18-24"], data["25-34"], data["35-44"], data["45-54"], data["55-74"], data["75+"]],
            },
        ],
    };
    return (
        <BarChart
            data={testData}
            style={barChartStyle}
            width={adjustedWidth}
            height={chartHeight}
            chartConfig={barChartConfig}
            verticalLabelRotation={30} // Zwiększ kąt rotacji etykiet
        />
    );
};