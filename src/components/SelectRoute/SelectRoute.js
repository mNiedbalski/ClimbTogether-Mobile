import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Button, Column, Select, Center } from 'native-base';
import recordClimbingStyles from './SelectRoute.style';
import defaultStyles from '../../../AppStyles.style';

import { fetchGymsFromDB, fetchRoomsFromDB, fetchRoutesFromDB } from '../../databaseFunctions/fetchingFunctions';

const SelectRoute = ({ navigation }) => {
  let [gyms, setGyms] = useState([]);
  let [rooms, setRooms] = useState([]);
  let [routes, setRoutes] = useState([]);
  let [selectedGymID, setGymID] = useState('');
  let [selectedRoomID, setRoomID] = useState('');
  let [selectedRouteID, setRouteID] = useState('');
  let [gymSelected, setGymSelected] = useState(false);
  let [routeSelected, setRouteSelected] = useState(false);
  let [roomSelected, setRoomSelected] = useState(false);


  //Loading database on start and setting up component on close
  useEffect(() => {
    const fetchGyms = async () => {
      const data = await fetchGymsFromDB();
      setGyms(data);
      console.log("fetched gyms: ", data);
    }
    fetchGyms();
    return () => {
      setRoomSelected(false);
      setGymSelected(false);
      console.log("Component unmounted. Resetting variables.");
    };

  }, []);
  //Called when gym has been selected
  useEffect(() => {
    const fetchRooms = async () => {
      const data = await fetchRoomsFromDB(selectedGymID);
      setRooms(data);
      console.log("fetched rooms: ", data);
    }
    fetchRooms();
  }, [selectedGymID]);
  //Called when room has been selected
  useEffect(() => {
    const fetchRoutes = async () => {
      const data = await fetchRoutesFromDB(selectedRoomID);
      setRoutes(data);
      console.log("fetched routes: ", data);
    }
    fetchRoutes();
  }, [selectedRoomID]);

  const handleGymChange = async (selectedGymID) => {
    setGymID(selectedGymID);
    setGymSelected(true);
  };
  const handleRoomChange = (selectedRoomID) => {
    setRoomID(selectedRoomID);
    setRoomSelected(true);
    console.log(selectedRoomID);
  };
  const handleRouteChange = (selectedRouteID) => {
    setRouteID(selectedRouteID);
    setRouteSelected(true);
    console.log(selectedRouteID);
  };

  return (
    <NativeBaseProvider>
      <Box style={defaultStyles.componentWrapper}>
        <Box style={[defaultStyles.defaultContainer, { justifyContent: 'center', marginTop: '30%' }]}>
          <Box style={recordClimbingStyles.buttonContainer}>
            <Box>
              <Column space={10}>
                <Center>
                  <Box style={recordClimbingStyles.selectWrapper}>
                    <Select
                      placeholder='Select a gym'
                      selectedValue={selectedGymID}
                      onValueChange={handleGymChange}
                      size="xl"
                      bg="#FDFCEC"
                      placeholderTextColor='#424242'
                    >
                      {gyms ? (
                        gyms.map((gym) => (
                          <Select.Item label={gym.name} value={gym.id} key={gym.id} />
                        ))
                      ) : (
                        <Select.Item label="No gym selected" value={null} />
                      )}
                    </Select>
                  </Box>
                </Center>
                <Center>
                  <Box style={recordClimbingStyles.selectWrapper}>
                    <Select
                      placeholder='Select room'
                      selectedValue={selectedRoomID}
                      onValueChange={handleRoomChange}
                      placeholderTextColor='#424242'
                      bg="#FDFCEC"
                      size="xl"
                      isDisabled={!gymSelected}
                    >
                      {gymSelected && rooms ? (
                        rooms.map((room) => (
                          <Select.Item label={room.name} value={room.id} key={room.id} />
                        ))
                      ) : (
                        <Select.Item label="No gym selected" value={null} />
                      )}
                    </Select>
                  </Box>
                </Center>
                <Center>
                  <Box style={recordClimbingStyles.selectWrapper}>
                    <Select
                      placeholder='Select route'
                      selectedValue={selectedRouteID}
                      onValueChange={handleRouteChange}
                      bg="#FDFCEC"
                      placeholderTextColor='#424242'
                      size="xl"
                      isDisabled={!roomSelected}
                    >
                      {roomSelected && routes ? (
                        console.log(routes),
                        routes.map((route) => (
                          <Select.Item label={route.name} value={route.id} key={route.id} />
                        ))
                      ) : (
                        <Select.Item label="No room selected" value={null} />
                      )}
                    </Select>
                  </Box>
                </Center>

              </Column>
            </Box>
          </Box>
          <Box style={{ marginTop: '20%' }}>
            <Button
              style={defaultStyles.defaultButton}
              onPress={() => navigation.navigate('Record Climbing', { gymID: selectedGymID, roomID: selectedRoomID, routeID: selectedRouteID })}
              isDisabled={!routeSelected}
            >
              Record Climbing
            </Button>
          </Box>
        </Box>
      </Box>

    </NativeBaseProvider>
  );
}

export default SelectRoute;
