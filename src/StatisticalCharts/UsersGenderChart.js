import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import { useEffect, useState } from 'react';
import { Spinner } from 'native-base';
import { extractUsersGendersCount } from '../components/AdminUsersPanel/AdminUsersPanelFunctions';
import { chartConfig, chartHeight, chartWidth } from './DefaultConfig';
export const UsersGenderDataChart = () => {
    const [maleCount, setMaleCount] = useState(1);
    const [femaleCount, setFemaleCount] = useState(2);
    const [otherCount, setOtherCount] = useState(3);
    const [dataLoaded, setDataLoaded] = useState(false);
    let data = [
        {
            name: "Male",
            population: maleCount,
            color: "#EEB959",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Female",
            population: femaleCount,
            color: "#424242",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Other",
            population: otherCount,
            color: "#987768",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];
    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await extractUsersGendersCount();
            setMaleCount(fetchedData.male);
            setFemaleCount(fetchedData.female);
            setOtherCount(fetchedData.other);
            setDataLoaded(true);
        }
        fetchData();
    }, []);

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