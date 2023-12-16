import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Text, Button } from 'native-base';
import { postAttemptToDB, updateUserExperience, updateUserLevel } from '../../databaseFunctions/postingFunctions';
import { calculateUserExperienceAndUpdate, updateRouteDifficulty, fetchRoute } from './RecordClimbingFunctions';


const RecordClimbing = ({ route }) => {
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
    restartRecording();
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
    const fetchedRoute = fetchRoute(route.params.roomID, route.params.routeID);
    setRouteAttempted(fetchedRoute);
  },[]);

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
    <NativeBaseProvider>
      <Box style={{ marginTop: '30%' }}>
        {!timerStarted && (
          <Box>
            <Text>Route ID: {routeAttempted.name}</Text>
            <Text>Difficulty: {routeAttempted.difficulty}</Text>
            <Text>Routesetter: {routeAttempted.routeSetter} </Text>
            <Button onPress={startTimer}>Start Timer</Button>
          </Box>
        )}
        {timerStarted && !timerStopped && (
          <Box>
            <Button onPress={stopTimer}>Stop</Button>
            <Button onPress={handleZoneReached}>Zone Reached</Button>
            <Button onPress={handleTopReached}>Top Reached</Button>
          </Box>
        )}
        {topReached && (
          <Box>
            <Text>Elapsed Time: {formatTime(elapsedTime)} s</Text>
            <Text>Parameters of attempt:</Text>
            <Button onPress={restartRecording}>Retry</Button>
            <Button>Go back</Button>
         </Box> 
        )}
      </Box>
    </NativeBaseProvider>
  );
};

export default RecordClimbing;
