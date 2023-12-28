import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, Text, Box, Row, Input, Column, Center, Button, Select, ScrollView } from 'native-base';
import defaultStyles from '../../../AppStyles.style';
import browseRoutesStyles from '../BrowseRoutes/BrowseRoutes.style'
import { fetchRouteFromDB, getBasicUserInfoFromDB } from '../../databaseFunctions/fetchingFunctions';
import { handleModify } from './viewRouteInfoFunctions';
import { checkIfUserCanAddRoute } from '../BrowseRoutes/BrowseRoutes';

const ViewRouteInfo = ({ route, navigation }) => {
    const [selectedRoomID, setRoomID] = useState(route.params.roomID);
    const [selectedRouteID, setRouteID] = useState(route.params.routeID);
    const [selectedRoute, setRoute] = useState({});
    const [privilegesGranted, setPrivilegesGranted] = useState(false);
    let [routeName, setRouteName] = useState('');
    fetchData = async () => {
        const data = await fetchRouteFromDB(selectedRoomID, selectedRouteID);
        const userData = await getBasicUserInfoFromDB();
        setRoute(data);
        setPrivilegesGranted(checkIfUserCanAddRoute(userData));
        setRouteName(data.name);
        setRouteDifficulty(data.difficulty);
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
                            {!privilegesGranted ? (
                                <Box>
                                    <Text>Route name: {selectedRoute.name}</Text>
                                    <Text>Difficulty: {selectedRoute.difficulty}</Text>
                                    <Text>Routesetter: {selectedRoute.routeSetter}</Text>
                                </Box>
                            ) : (
                                <Box>
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
                                            <Text>Modify route</Text>
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button
                                            style={defaultStyles.defaultButton}>
                                            <Text>Delete route</Text>
                                        </Button>
                                    </Box>
                                </Box>
                            )}

                            <Box>
                                <Button
                                    style={defaultStyles.defaultButton}
                                    onPress={() => navigation.goBack()}>
                                    <Text>Back</Text>
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