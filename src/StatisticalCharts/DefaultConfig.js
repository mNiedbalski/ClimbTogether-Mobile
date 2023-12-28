import { Dimensions } from "react-native";
export const chartConfig = {
    backgroundGradientFrom: "#FDFCEC",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FDFCEC",
    backgroundGradientToOpacity: 0.8,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
export const chartWidth = Dimensions.get('window').width;
export const chartHeight = Dimensions.get('window').height / 3;
export const barChartConfig = {
    ...chartConfig,
    color: (opacity = 1) => `#424242`, // Kolor słupków
};

const marginLeft = -20;
export const adjustedWidth = chartWidth + Math.abs(marginLeft);

export const barChartStyle = {
    marginVertical: 8,
    borderRadius: 16,
    marginLeft: marginLeft,
};
