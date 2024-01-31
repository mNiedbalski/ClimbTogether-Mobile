import React, { useEffect, useState } from 'react';
import { Box, Input, FormControl, NativeBaseProvider, Select, Button, Text, Column } from 'native-base';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import defaultStyles from '../../../AppStyles.style';
import { fetchGymsFromDB } from '../../databaseFunctions/fetchingFunctions';
import { fetchRoomsFromDB } from '../../databaseFunctions/fetchingFunctions';
import { addRouteToDB } from '../../databaseFunctions/Routes';
import { auth } from '../../../App';
import { useNavigation } from '@react-navigation/native';

const AddNewRoute = ({ navigation }) => {
    const [selectedGymID, setGymID] = useState('');
    const [gyms, setGyms] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedRoomID, setRoomID] = useState('');
    const [selectedGrade, setGrade] = useState('');
    const [newRouteName, setNewRouteName] = useState('');
    const [routeAdded, setRouteAdded] = useState(false);
    const routeGrades = [];
    for (let i = 1; i <= 17; i++) {
        routeGrades.push(`V${i}-`);
        routeGrades.push(`V${i}`);
        routeGrades.push(`V${i}+`);
    }
    useEffect(() => {
        const fetchData = async () => {
            const gymsData = await fetchGymsFromDB();
            setGyms(gymsData);
        };
        fetchData();
    }, []);
    const handleGymChange = async (selectedGymID) => {
        setGymID(selectedGymID);
        const data = await fetchRoomsFromDB(selectedGymID);
        setRooms(data);
    };
    const handleRoomChange = (selectedRoomID) => {
        setRoomID(selectedRoomID);
    };
    const handleGradeSelect = (selectedGrade) => {
        setGrade(selectedGrade);
    }
    const handleRouteInput = (newRouteName) => {
        setNewRouteName(newRouteName);
    }
    const handleAddRoute = async () => {
        setRouteAdded(true);
        await addRouteToDB(selectedRoomID, newRouteName, selectedGrade);
    }

    return (
        <Box style={defaultStyles.componentWrapper}>
            <Box style={defaultStyles.defaultContainer}>
                <Column space={8}>
                    {routeAdded ? (
                        <Text>Trasa dodana: {newRouteName}, {selectedGrade}</Text>
                    ) : (
                        <Box>
                            <Select
                                placeholder='Select a gym'
                                selectedValue={selectedGymID}
                                onValueChange={handleGymChange}
                                placeholderTextColor='#424242'
                                size="md"
                                bg="#FDFCEC"
                            >
                                {gyms ? (
                                    gyms.map((gym) => (
                                        <Select.Item label={gym.name} value={gym.id} key={gym.id} />
                                    ))
                                ) : (
                                    <Select.Item label="No gym selected" value={null} />
                                )}
                            </Select>

                            <Select
                                placeholder='Select a room'
                                selectedValue={selectedRoomID}
                                onValueChange={handleRoomChange}
                                placeholderTextColor='#424242'
                                size="md"
                                bg="#FDFCEC"
                            >
                                {rooms ? (
                                    rooms.map((room) => (
                                        <Select.Item label={room.name} value={room.id} key={room.id} />
                                    ))
                                ) : (
                                    <Select.Item label="No room selected" value={null} />
                                )}
                            </Select>

                            <FormControl isRequired>
                                <FormControl.Label>Route name</FormControl.Label>
                                <Input
                                    placeholder='gym alias+roomLetter+routeNumber'
                                    size="md"
                                    value={newRouteName}
                                    onChangeText={handleRouteInput}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Route grade</FormControl.Label>
                                <Select
                                    placeholder='Please select route grade...'
                                    size="md"
                                    selectedValue={selectedGrade}
                                    onValueChange={handleGradeSelect}
                                >
                                    {routeGrades.map((grade) => (
                                        <Select.Item key={grade} label={grade} value={grade} />
                                    ))}
                                </Select>
                            </FormControl>
                            <Button style={defaultStyles.defaultButton} onPress={handleAddRoute}>
                                <Text color="white"> Add route </Text>
                            </Button>
                        </Box>
                    )}
                    </Column>

                    <Button
                        style={[defaultStyles.defaultButton, {position: 'absolute', width: '100%', bottom: 0}]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text color="white">Go back</Text>
                    </Button>
                

            </Box>
        </Box>
    );
};

export default AddNewRoute;