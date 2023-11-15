import React from 'react';
import { Container, Content, NativeBaseProvider, Text, Box } from 'native-base';
import homePageStyles from './HomePage.style';

const HomePage = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <Box style={homePageStyles.statsPanel} >
                <Text>Home page</Text>
            </Box>
        </NativeBaseProvider>
    );
};

export default HomePage;
