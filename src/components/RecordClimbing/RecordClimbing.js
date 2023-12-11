import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Text, Button } from 'native-base';
import { postAttemptToDB, updateUserExperience, updateUserLevel } from '../../firebaseFunctions/postingFunctions';
import { getUserExperienceFromDB, getRouteDifficultyFromDB, extractDifficultyValue } from '../../firebaseFunctions/fetchingFunctions';

const calculateUserExperienceAndUpdate = async (checkedRoomID, checkedRouteID ) => {
  let userExperience = await getUserExperienceFromDB();
  const completedRouteDifficulty = await getRouteDifficultyFromDB(checkedRouteID, checkedRoomID);
  const expPoints = extractDifficultyValue(completedRouteDifficulty);
  if (userExperience + expPoints >= 10) {
    updateUserLevel();
    userExperience = userExperience + expPoints - 10;
    updateUserExperience(userExperience);
  }
  else {
    userExperience = expPoints;
    updateUserExperience(userExperience);
  }
}


const RecordClimbing = ({ route }) => {
  const [gymID, setGymID] = useState(route.params.gymID); 
  const [roomID, setRoomID] = useState(route.params.roomID); 
  const [routeID, setRouteID] = useState(route.params.routeID); 
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
    console.log("routes.attempts updated:", selectedRoute.attempts);
  }, [selectedRoute]);
  useEffect(() => {
    console.log("zoneReached updated:", zoneReached);
  }, [zoneReached]);

  useEffect(() => {
    console.log("topReached updated:", topReached);
  }, [topReached]);


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
          <>
            <Text>Elapsed Time: {formatTime(elapsedTime)} s</Text>
            <Text>Parameters of attempt:</Text>
            <Button onPress={restartRecording}>Retry</Button>
            <Button>Go back</Button>
          </>
        )}
      </Box>
    </NativeBaseProvider>
  );
};

export default RecordClimbing;
