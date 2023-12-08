import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Text, Button } from 'native-base';
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { auth } from '../../../App';
import { postAttemptToDB } from '../../firebaseFunctions/postingFunctions';


const RecordClimbing = ({ route }) => {
  const [gymID, setGymID] = useState(route.params.gymID); //TODO: get gymID from loggedUser
  const [roomID, setRoomID] = useState(route.params.roomID); //TODO: get gymID from loggedUser
  const [routeID, setRouteID] = useState(route.params.routeID); //TODO: get gymID from loggedUser
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
    //TODO: db.collection('users').doc(this.username).collection('booksList').doc(myBookId).set...
    //CZYLI TRZEBA ODWOLAC SIE ROBIAC KOLEKCJA PO KOLEKCJI I PO DOCSACH
    //const userAttemptsCollectionRef = collection(db, "users", auth.currentUser.uid, "attempts");
  // Referencja do dokumentu użytkownika
  //const userDocRef = doc(db, 'users', auth.currentUser.uid);

  // Referencja do kolekcji 'attempts' dla aktualnie zalogowanego użytkownika
  //const attemptsCollectionRef = collection(userDocRef, 'attempts');

  // Referencja do kolekcji 'attempts' dla konkretnej trasy
 // const routeAttemptsCollectionRef = collection(db, 'rooms', roomID, 'routes', routeID, 'attempts');
/*
  try {
    // Dodajemy nowy dokument do kolekcji 'attempts' dla użytkownika
    //const newAttemptDocRef = await addDoc(userAttemptsCollectionRef, attemptDocData);
    console.log('Added document to user attempts with ID:', newAttemptDocRef.id);

    // Dodajemy nowy dokument do kolekcji 'attempts' dla konkretnej trasy
    //const newRouteAttemptDocRef = await addDoc(routeAttemptsCollectionRef, attemptDocData);
   // console.log('Added document to route attempts with ID:', newRouteAttemptDocRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }*/
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
