import React from 'react';
import { Container, Content, NativeBaseProvider, Text, Box } from 'native-base';

const HomePage = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <Box>
                <Text>Home page</Text>
            </Box>
        </NativeBaseProvider>
    );
};

export default HomePage;
