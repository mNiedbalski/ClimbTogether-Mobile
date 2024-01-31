import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, Text, Box, Row, Input, Column, Center, Button, Select, ScrollView } from 'native-base';
import defaultStyles from '../../../AppStyles.style';
import browseRoutesStyles from '../BrowseRoutes/BrowseRoutes.style'
import { fetchRouteFromDB, getBasicUserInfoFromDB } from '../../databaseFunctions/fetchingFunctions';
import { handleModify } from './viewRouteInfoFunctions';
import { checkIfRouteSetter } from '../BrowseRoutes/BrowseRoutes';
import { deleteRouteFromDB } from '../../databaseFunctions/Routes';

const ViewRouteInfo = ({ route, navigation }) => {
    const [selectedRoomID, setRoomID] = useState(route.params.roomID);
    const [selectedRouteID, setRouteID] = useState(route.params.routeID);
    const [selectedRoute, setRoute] = useState({});
    const [privilegesGranted, setPrivilegesGranted] = useState(false);
    const [routeDeleted, setRouteDeleted] = useState(false);
    let [routeName, setRouteName] = useState('');
    fetchData = async () => {
        const data = await fetchRouteFromDB(selectedRoomID, selectedRouteID);
        const userData = await getBasicUserInfoFromDB();
        setRoute(data);
        setPrivilegesGranted(checkIfRouteSetter(userData));
        setRouteName(data.name);
        setRouteDifficulty(data.difficulty);
    };
    handleDelete = async (roomID, routeID) => {
        setRouteDeleted(true);
        await deleteRouteFromDB(roomID, routeID);
    };
    useEffect(() => {
        setRoomID(route.params.roomID);
        setRouteID(route.params.routeID);
        fetchData();
    }, []);
    return (
        <NativeBaseProvider>
            <Box style={defaultStyles.componentWrapper}>
                <Box style={[defaultStyles.defaultContainer, { height: '85%', marginTop: 0 }]}>
                    <Box style={browseRoutesStyles.panel}>
                        <Column space={3}>
                            <Box style={{ marginTop: '5%', marginLeft: '5%' }}>
                                <Text fontSize={20}>Route info...</Text>
                            </Box>

                            {routeDeleted ? (
                                <Column space={3}>
                                    <Text>Trasa została pomyślnie usunięta.</Text>
                                    <Button
                                        style={defaultStyles.defaultButton}
                                        onPress={() => navigation.goBack()}
                                    >
                                        <Text color={'white'}>Back</Text>
                                    </Button>
                                </Column>
                            ) : (
                                privilegesGranted ? (
                                    <Column space={3}>
                                        <Input
                                            placeholder={selectedRoute.name}
                                            value={routeName}
                                            onChangeText={setRouteName}
                                            size="md"
                                        />
                                        <Text>Difficulty: {selectedRoute.difficulty}</Text>
                                        <Text>Routesetter: {selectedRoute.routeSetter}</Text>
                                        <Box>
                                            <Button
                                                style={defaultStyles.defaultButton}
                                                onPress={() => handleModify(selectedRouteID, selectedRoomID, routeName)}
                                            >
                                                <Text color={'white'}>Modify route</Text>
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Button
                                                onPress={() => handleDelete(selectedRoomID, selectedRouteID)}
                                                style={defaultStyles.defaultButton}
                                            >
                                                <Text color={'white'}>Delete route</Text>
                                            </Button>
                                        </Box>
                                    </Column>
                                ) : (
                                    <Column space={3}>
                                        <Text>Route name: {selectedRoute.name}</Text>
                                        <Text>Difficulty: {selectedRoute.difficulty}</Text>
                                        <Text>Routesetter: {selectedRoute.routeSetter}</Text>
                                    </Column>
                                )
                            )}


                            <Box>
                                <Button
                                    style={defaultStyles.defaultButton}
                                    onPress={() => navigation.goBack()}>
                                    <Text color={'white'}>Back</Text>
                                </Button>
                            </Box>
                        </Column>
                    </Box>
                </Box>
            </Box>
        </NativeBaseProvider>
    );

};

export default ViewRouteInfo;