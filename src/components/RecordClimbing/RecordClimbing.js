import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Text, Button, Column } from 'native-base';
import { postAttemptToDB, updateUserExperience, updateUserLevel } from '../../databaseFunctions/postingFunctions';
import { calculateUserExperienceAndUpdate, updateRouteDifficulty, fetchRoute } from './RecordClimbingFunctions';
import { fetchRouteFromDB } from '../../databaseFunctions/fetchingFunctions';
import defaultStyles from '../../../AppStyles.style';


const RecordClimbing = ({ route, navigation }) => {
  const [gymID, setGymID] = useState(route.params.gymID);
  const [roomID, setRoomID] = useState(route.params.roomID);
  const [routeID, setRouteID] = useState(route.params.routeID);
  const [routeAttempted, setRouteAttempted] = useState({});
  const [selectedRoute, setSelectedRoute] = useState({});
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerStopped, setTimerStopped] = useState(false);
  const [zoneReached, setZoneReached] = useState(false);
  const [topReached, setTopReached] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const millisecondsPart = milliseconds % 1000;
    return `${seconds}.${millisecondsPart < 100 ? '0' : ''}${millisecondsPart}`;
  };
  const createNewAttempt = async (measuredTime, wasZoneReached, wasTopReached) => {
    const attemptDocData = {
      attempt_time: new Date(),
      completion_time: measuredTime,
      zone_reached: wasZoneReached,
      top_reached: wasTopReached,
    }
    await postAttemptToDB(attemptDocData, roomID, routeID);
    if (wasTopReached)
      await calculateUserExperienceAndUpdate(roomID, routeID);
    await updateRouteDifficulty(roomID, routeID);
  };
  const startTimer = () => {
    setTimerStarted(true);
    setTimerStopped(false);
    setZoneReached(false);
    setTopReached(false);
    setElapsedTime(0);
  };
  const stopTimer = () => {
    setTimerStopped(true);
    createNewAttempt(elapsedTime, zoneReached, topReached);
    restartRecording();
  };
  const handleZoneReached = () => {
    setZoneReached(true);
  };

  const handleTopReached = () => {
    setTimerStopped(true);
    createNewAttempt(elapsedTime, true, true);
    setTopReached(true);
  };
  const restartRecording = () => {
    setTimerStarted(false);
    setTimerStopped(false);
    setZoneReached(false)
    setTopReached(false);
    setElapsedTime(0);
  };
  useEffect(() => {
    console.log("zoneReached updated:", zoneReached);
  }, [zoneReached]);

  useEffect(() => {
    console.log("topReached updated:", topReached);
  }, [topReached]);
  useEffect(() => {
    const fetchData = async () => {
      const routeFetched = await fetchRouteFromDB(roomID, routeID);
      setRouteAttempted(routeFetched);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let timeout;
    if (timerStarted && !timerStopped) {
      const startTime = Date.now();
      const updateElapsedTime = () => {
        setElapsedTime(Date.now() - startTime);
        timeout = setTimeout(updateElapsedTime, 1);
      };
      timeout = setTimeout(updateElapsedTime, 1);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [timerStarted, timerStopped]);

  return (
    <Box style={defaultStyles.componentWrapper}>
      <Box style={defaultStyles.defaultContainer}>
        <Box style={{ marginTop: '30%' }}>
          {!timerStarted && (
            <Box>
              <Column space={3}>
                <Text>Route ID: {routeAttempted.name}</Text>
                <Text>Difficulty: {routeAttempted.difficulty}</Text>
                <Text>Routesetter: {routeAttempted.routeSetter} </Text>
                <Button style={defaultStyles.defaultButton} onPress={startTimer}>Start Timer</Button>
                <Button style={defaultStyles.defaultButton} onPress={() => navigation.goBack()}>Go back</Button>
              </Column>

            </Box>
          )}
          {timerStarted && !timerStopped && (
            <Box style={{ marginTop: '45%' }}>
              <Column space={3}>
                <Button size="lg" style={defaultStyles.defaultButton} onPress={stopTimer}>Stop</Button>
                <Button size="lg" style={defaultStyles.defaultButton} onPress={handleZoneReached}>Zone Reached</Button>
                <Button size="lg" style={defaultStyles.defaultButton} onPress={handleTopReached}>Top Reached</Button>
              </Column>
            </Box>

          )}
          {topReached && (
            <Box style={{ marginTop: '45%' }}>
              <Column space={3}>
                <Text>Elapsed Time: {formatTime(elapsedTime)} s</Text>
                <Button size="lg" style={defaultStyles.defaultButton} onPress={restartRecording}>Retry</Button>
                <Button size="lg" style={defaultStyles.defaultButton} onPress={() => navigation.goBack()}>Go back</Button>
              </Column>
            </Box>
          )}
        </Box>
      </Box >
    </Box>



  );
};

export default RecordClimbing;
