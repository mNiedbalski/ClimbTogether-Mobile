
import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, Text, Box, Row, Column, Center, Button, Select, ScrollView } from 'native-base';
import defaultStyles from '../../../AppStyles.style';
import routeSetterPanelStyles from './BrowseRoutes.style';
import { fetchGymsFromDB, fetchAllRoutesFromGym, fetchRouteFromDB } from '../../firebaseFunctions/fetchingFunctions';

const BrowseRoutes = ({ navigation }) => {
    let [selectedGymID, setGymID] = useState('');
    let [gyms, setGyms] = useState([]);
    let [gymSelected, setGymSelected] = useState(false);
    let [routes, setRoutes] = useState([]);
    let [selectedRouteID, setRouteID] = useState('');
    const handleGymChange = async (selectedGymID) => {
        setGymID(selectedGymID);
        const data = await fetchAllRoutesFromGym(selectedGymID);
        setRoutes(data);
        setGymSelected(true);
    };
    useEffect(() => {
        const fetchGyms = async () => {
            const data = await fetchGymsFromDB();
            setGyms(data);
            console.log("fetched gyms: ", data);
        }
        fetchGyms();
        return () => {
        };
    },
        [])

    return (
        <NativeBaseProvider>
            <Box style={defaultStyles.componentWrapper}>
                <Box style={[defaultStyles.defaultContainer, { height: '85%', marginTop: 0 }]}>
                    <Box style={routeSetterPanelStyles.panel}>
                        <Column>
                            <Box style={{ marginTop: '5%', marginLeft: '5%' }}>
                                <Text fontSize={20}>Modify routes...</Text>
                            </Box>
                            <Box>
                                <Select
                                    placeholder='Select a gym'
                                    selectedValue={selectedGymID}
                                    onValueChange={handleGymChange}
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
                            <Center>
                                <Box style={routeSetterPanelStyles.scrollView}>
                                    <Text>Search route</Text>
                                    <ScrollView>
                                        <Column space={3}>
                                            {routes.map((route) => (
                                                <Box style={routeSetterPanelStyles.scrollViewElement} key={route.id}>
                                                    <Row space={6}>
                                                        <Box style={routeSetterPanelStyles.dot} />
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
                                                    </Row>
                                                </Box>
                                            ))}
                                        </Column>
                                    </ScrollView>
                                    <Box>
                                        <Button style={defaultStyles.buttonDefault}>
                                            <Text>Add new route</Text>
                                        </Button>
                                    </Box>
                                </Box>
                            </Center>
                        </Column>
                    </Box>
                </Box>
            </Box>
        </NativeBaseProvider>
    );
};

export default BrowseRoutes;