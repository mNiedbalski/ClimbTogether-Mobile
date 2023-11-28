import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { NativeBaseProvider, Box, Text, Button } from 'native-base';


const RecordClimbing = ({ navigation }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    const startRecording = () => {
        setIsRecording(true);
        setShowButtons(true);
    };

    const endRecording = () => {
        setIsRecording(false);
        setShowButtons(false);
    };

    return (
        <NativeBaseProvider>
            <Box>
                <Text>RecordClimbing</Text>
                {!isRecording && !showButtons && (
                    <Button onPress={startRecording}>Start Route</Button>
                )}
                {showButtons && (
                    <>
                        <Button onPress={endRecording}>Top</Button>
                        <Button>Cancel</Button>
                        <Button>Zone</Button>
                    </>
                )}
            </Box>
        </NativeBaseProvider>
    );
};

export default RecordClimbing;
