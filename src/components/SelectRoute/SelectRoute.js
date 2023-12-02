import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Button, Column, Select } from 'native-base';
import recordClimbingStyles from './SelectRoute.style';
import { Route } from '../../Entities/route';
import { User } from '../../Entities/user';
import { Attempt } from '../../Entities/attempt';
import { Achievement } from '../../Entities/achievement';
import { Role } from '../../Entities/role';
import { Room } from '../../Entities/room';
import { Gym } from '../../Entities/gym';
//TEST DATA

import { testGym } from '../../../App';
import { loggedUser } from '../../../App';

//TEST DATA

const SelectRoute = ({ navigation }) => {
  let [gyms, setGyms] = useState([]);
  let [selectedGym, setGym] = useState('');
  let [selectedRoom, setRoom] = useState('');
  let [route, setRoute] = useState('');
  let [gymSelected, setGymSelected] = useState(false);
  let [routeSelected, setRouteSelected] = useState(false);
  let [roomSelected, setRoomSelected] = useState(false);

  //Fetching gyms from database
  fetchGyms = async () => {
    return [testGym];
  };

  //Loading database and setting up component on close
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGyms();
      setGyms(data);
    }
    fetchData();
    return () => {
      gyms = [testGym];
      setRoomSelected(false);
      setGymSelected(false);
      console.log("Component unmounted. Resetting variables.");
    };
    
  }, []);

  const handleGymChange = (gym) => {
    setGym(gym);
    setGymSelected(true);
    console.log(selectedGym);
    console.log(loggedUser);
  };
  const handleRoomChange = (room) => {
    setRoom(room);
    setRoomSelected(true);
    console.log(selectedRoom);
  };
  const handleRouteChange = (value) => {
    setRoute(value);
    setRouteSelected(true);
  };

  return (
    <NativeBaseProvider>
      <Box style={recordClimbingStyles.buttonContainer}>
        <Column>
          <Box style={recordClimbingStyles.selectWrapper}>
            <Select
              placeholder='Select a gym'
              selectedValue={selectedGym}
              onValueChange={handleGymChange}
              style={recordClimbingStyles.select}
              placeholderTextColor='#424242'
            >
              {gyms ? (
                 gyms.map((gym) => (
                  <Select.Item label={gym.name} value={gym} key={gym.id} />
                ))
              ) : (
                <Select.Item label="No gym selected" value={null} />
              )}
            </Select>
          </Box>
          <Box style={recordClimbingStyles.selectWrapper}>
            <Select
              placeholder='Select room'
              selectedValue={selectedRoom}
              onValueChange={handleRoomChange}
              style={recordClimbingStyles.select}
              placeholderTextColor='#424242'
              isDisabled={!gymSelected}
            >
              {gymSelected && selectedGym.rooms ? (
                selectedGym.rooms.map((room) => (
                  <Select.Item label={room.name} value={room} key={room.id} />
                ))
              ) : (
                <Select.Item label="No gym selected" value={null} />
              )}
            </Select>
          </Box>
          <Box style={recordClimbingStyles.selectWrapper}>
            <Select
              placeholder='Select route'
              selectedValue={route}
              onValueChange={handleRouteChange}
              style={recordClimbingStyles.select}
              placeholderTextColor='#424242'
              isDisabled={!roomSelected}
            >
              {roomSelected && selectedRoom.routes ? (
                console.log(selectedRoom.routes),
                selectedRoom.routes.map((route) => (
                  <Select.Item label={route.route_name} value={route} key={route.id} />
                ))
              ) : (
                <Select.Item label="No room selected" value={null} />
              )}
            </Select>
          </Box>
          <Box>
            <Button
              style={recordClimbingStyles.button}
              onPress={() => navigation.navigate('Record Climbing', { route: route })}
              isDisabled={!routeSelected}
            >
              Record Climbing
            </Button>
          </Box>
        </Column>
      </Box>
    </NativeBaseProvider>
  );
}

export default SelectRoute;
