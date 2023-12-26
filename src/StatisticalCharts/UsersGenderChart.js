import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import { useEffect, useState } from 'react';
import { extractUsersGendersCount } from '../components/AdminUsersPanel/AdminUsersPanelFunctions';
export const UsersGenderDataChart = () => {
    const [maleCount, setMaleCount] = useState(1);
    const [femaleCount, setFemaleCount] = useState(2);
    const [otherCount, setOtherCount] = useState(3);
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
            color: "white",
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
        }
        fetchData();
    }, []);
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (
        <PieChart
            data={data}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').height/3}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[0, 0]}
            absolute
        />
    )
};