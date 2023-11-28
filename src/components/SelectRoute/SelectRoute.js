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
const userRole = new Role(1, "user");
const adminRole = new Role(2, "admin");
const attempt1 = new Attempt(1, new Date('2023-11-25'), 15.5, true, false);
const attempt2 = new Attempt(2, new Date('2023-11-25'), 23.1, true, true);
const attempt3 = new Attempt(3, new Date('2023-11-25'), 13.5, true, true);
const testRoute1 = new Route(1, 'Test route', 1, 'V7', [attempt1, attempt2, attempt3], attempt3);
const testRoom = new Room(1, 'Main room', [testRoute1]);
const testGym = new Gym(1, 'Gabriela Narutowicza 51, 41-200 Sosnowiec', 'Poziom 450', [testRoom]);
const achievements1 = new Achievement(1, 'First route', 'Complete your first route!', new Date('2023-11-25'));
const loggedUser = new User(1, 'testUser', 'Michał', 'Niedbalski', 'male', new Date('2001-04-10'), 180, 75,
  [userRole, adminRole],
  [attempt1, attempt2, attempt3],
  30,
  1,
  [achievements1]);
let gyms = [testGym];
//TEST DATA
const SelectRoute = ({ navigation }) => {
  let [selectedGym, setGym] = useState('');
  let [selectedRoom, setRoom] = useState('');
  let [route, setRoute] = useState('');
  let [gymSelected, setGymSelected] = useState(false);
  let [routeSelected, setRouteSelected] = useState(false);
  let [roomSelected, setRoomSelected] = useState(false);

  const handleGymChange = (gym) => {
    setGym(gym);
    setGymSelected(true);
    console.log(selectedGym);
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
              {gyms.map((gym) => {
                return (
                  <Select.Item label={gym.name} value={gym} key={gym.id} />
                );
              })}
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
        </Column>
      </Box>
    </NativeBaseProvider>
  );
}

export default SelectRoute;
