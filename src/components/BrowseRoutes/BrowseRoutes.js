
import React, { useEffect, useReducer, useState } from 'react';
import { NativeBaseProvider, Text, Box, Row, Column, Center, Button, Select, ScrollView } from 'native-base';
import defaultStyles from '../../../AppStyles.style';
import routeSetterPanelStyles from './BrowseRoutes.style';
import { fetchGymsFromDB, fetchAllRoutesFromGym, getBasicUserInfoFromDB } from '../../databaseFunctions/fetchingFunctions';

export const checkIfUserCanAddRoute = async (userData) => {
    console.log("userData", userData);
    if (userData && userData.roles) {
        for (const role of userData.roles) {
            if (role.role_name === 'routesetter' || role.role_name === 'admin') {
                console.log('User has privileges')
                return true;
            }
        }
    } else {
        console.log('User doesnt have privileges')
        return false;
    }
}
const BrowseRoutes = ({ navigation }) => {
    let [selectedGymID, setGymID] = useState('');
    let [gyms, setGyms] = useState([]);
    let [gymSelected, setGymSelected] = useState(false);
    let [routes, setRoutes] = useState([]);
    let [selectedRouteID, setRouteID] = useState('');
    const [privilegedGranted, setPrivilegesGranted] = useState(false);
    const [userInfo, setUserInfo] = useState('');

    const handleGymChange = async (selectedGymID) => {
        setGymID(selectedGymID);
        const data = await fetchAllRoutesFromGym(selectedGymID);
        setRoutes(data);
        setGymSelected(true);
    };
    const fetchUserData = async () => {
        const data = await getBasicUserInfoFromDB();
        return data;
    };
    useEffect(() => {
        const fetchData = async () => {
            const userData = await fetchUserData();
            const gymsData = await fetchGymsFromDB();
            setUserInfo(userData);
            setGyms(gymsData);
        };
        fetchData();
    }, []);
    useEffect(() => {
        const validate = async () => {
            const privilegesStatus = await checkIfUserCanAddRoute(userInfo);
            setPrivilegesGranted(privilegesStatus);
        };
        validate();
    }, [userInfo]);


    return (
        <NativeBaseProvider>
            <Box style={defaultStyles.componentWrapper}>
                <Box style={[defaultStyles.defaultContainer, { height: '85%', marginTop: 0 }]}>
                    <Box style={routeSetterPanelStyles.panel}>
                        <Column>
                            <Center>
                                <Box style={{ marginTop: '10%', width: '80%' }}>
                                    <Select
                                        placeholder='Select a gym'
                                        selectedValue={selectedGymID}
                                        onValueChange={handleGymChange}
                                        placeholderTextColor='#424242'
                                        size="xl"
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
                                </Box>
                            </Center>
                            <Center>
                                <Box style={routeSetterPanelStyles.scrollView}>
                                    <ScrollView>
                                        <Column space={3}>
                                            {routes.map((route) => (
                                                <Box style={routeSetterPanelStyles.scrollViewElement} key={route.id}>
                                                    <Box>
                                                        <Button
                                                            style={routeSetterPanelStyles.routeButton}
                                                            onPress={() => navigation.navigate('View Route Info', { routeID: route.id, roomID: route.roomID })}
                                                        >
                                                            <Box>
                                                                <Text >{route.name}</Text>
                                                            </Box>
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Column>
                                    </ScrollView>
                                </Box>
                            </Center>
                            <Box>
                                <Button style={[defaultStyles.defaultButton]}>
                                    <Text color="red">Add new route</Text>
                                </Button>
                            </Box>
                        </Column>
                    </Box>
                </Box>
            </Box>
        </NativeBaseProvider>
    );
};

export default BrowseRoutes;