import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Text, Button } from 'native-base';
import { Attempt } from '../../Entities/attempt';
import { v4 as uuidv4 } from 'uuid';

const loadRouteParams = async (route) => {
  return new Promise((resolve) => {
    if (route.params?.route) {
      resolve(route.params.route);
    } else {
      route.params?.onLoad?.((loadedRoute) => {
        resolve(loadedRoute);
      });
    }
  });
};

const RecordClimbing = ({ route }) => {
  const [attempt, setAttempt] = useState({});
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
  const createNewAttempt = (measuredTime, wasZoneReached, wasTopReached) => {
    const newAttempt = new Attempt(uuidv4(), new Date(), measuredTime, wasZoneReached, wasTopReached);
    setAttempt(newAttempt);
    updateRouteAttempts(newAttempt);
  };
  const updateRouteAttempts = (newAttempt) => {
    setSelectedRoute(prevRoute => {
      const updatedAttempts = [...prevRoute.attempts, newAttempt];
      return { ...prevRoute, attempts: updatedAttempts };
    });
  }

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
  };
  const restartRecording = () => {
    setTimerStarted(false);
    setTimerStopped(false);
    setZoneReached(false)
    setTopReached(false);
    setElapsedTime(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const loadedRoute = await loadRouteParams(route);
      setSelectedRoute(loadedRoute);

    };

    fetchData();
  }, [route]);
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
    console.log("attempt updated:", attempt);
  }, [attempt]);


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
        <Box>
          <Text>Attempting {selectedRoute.route_name}...</Text>
        </Box>
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
