import { BarChart } from 'react-native-chart-kit';
import { useEffect, useState } from 'react';
import { Spinner } from 'native-base';
import { chartHeight, barChartConfig, barChartStyle, adjustedWidth } from './DefaultConfig';
import { fetchAttemptsByRatingRange } from '../databaseFunctions/Attempts';

export const MostAttemptedDifficultyChart = ({ gymID }) => {
    const [chartData, setChartData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await fetchAttemptsByRatingRange(gymID);
            console.log("mostAttemptedDiffData",fetchedData)
            setChartData(fetchedData);
            setDataLoaded(true);
        }
        fetchData();
    }, []);
    const initialData = {
        labels: ["Beginner (<V2)", "Intermediate (V3-V6)", "Advanced (V7-V10)", "PRO (V11+)"],
        datasets: [
            {
                data: [chartData["V0_V2"],chartData["V3_V6"],chartData["V7_V10"],chartData["V11_and_above"]]
            },
        ],
    };
    const style = {

    };
    if (!dataLoaded) {
        return (
            <Spinner accessibilityLabel="Loading user info"
                color="#EEB959"
                size="lg"
            />
        )
    }
    else
        return (
            <BarChart
                data={initialData}
                style={barChartStyle}
                width={adjustedWidth}
                height={chartHeight}
                chartConfig={barChartConfig}
                verticalLabelRotation={10} 
            />
        )
};