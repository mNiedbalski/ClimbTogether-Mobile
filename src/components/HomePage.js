import React from 'react';
import { Container, Content, NativeBaseProvider, Text, Box } from 'native-base';

const HomePage = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <Box>
                <Text>Record Climbing</Text>
            </Box>
        </NativeBaseProvider>
    );
};

export default HomePage;
