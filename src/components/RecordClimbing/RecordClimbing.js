import React, { useState } from 'react';
import { Container, Content, Text, Box, NativeBaseProvider, Button } from 'native-base';

const RecordClimbing = ({ navigation }) => {
    let [timerStarted, setTimerStarted] = useState(false);
    let [timerStopped, setTimerStopped] = useState(false);
    let [zoneReached, setZoneReached] = useState(false);
    let [topReached, setTopReached] = useState(false);
    let [elapsedTime, setElapsedTime] = useState(0);

    const startTimer = () => {
        setTimerStarted(true);
    };

    const stopTimer = () => {
        setTimerStopped(true);
    };

    const handleZoneReached = () => {
        setZoneReached(true);
    };

    const handleTopReached = () => {
        setTopReached(true);
        setTimerStopped(true);
    };

    const calculateElapsedTime = () => {
        // Calculate elapsed time here
        // ...

        setElapsedTime(/* elapsed time value */);
    };

    return (
        <NativeBaseProvider>
            <Box style={{marginTop: '30%'}}>
                    {!timerStarted && (
                        <Button onPress={startTimer}>Start Timer</Button>
                    )}

                    {timerStarted && !timerStopped && (
                        <>
                            <Button onPress={stopTimer}>Stop</Button>
                            <Button onPress={handleZoneReached}>Zone Reached</Button>
                            <Button onPress={handleTopReached}>Top Reached</Button>
                        </>
                    )}

                    {topReached && (
                        <Text>Elapsed Time: {elapsedTime} seconds</Text>
                    )}
            </Box>
        </NativeBaseProvider>
    );
};

export default RecordClimbing;