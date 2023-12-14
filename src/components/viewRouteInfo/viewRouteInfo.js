import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, Text, Box, Row,Input,  Column, Center, Button, Select, ScrollView } from 'native-base';
import defaultStyles from '../../../AppStyles.style';
import routeSetterPanelStyles from '../BrowseRoutes/BrowseRoutes.style'
import { fetchRouteFromDB, getBasicUserInfoFromDB} from '../../firebaseFunctions/fetchingFunctions';

import { checkIfUserCanAddRoute  } from '../BrowseRoutes/BrowseRoutes';

const ViewRouteInfo = ({ route, navigation }) => {
    const [selectedRoomID, setRoomID] = useState(route.params.roomID);
    const [selectedRouteID, setRouteID] = useState(route.params.routeID);
    const [selectedRoute, setRoute] = useState({});
    const [privilegesGranted, setPrivilegesGranted] = useState(false);
    let [routeName, setRouteName] = useState('');
    let [routeDifficulty, setRouteDifficulty] = useState('');
    fetchData = async () => {
        const data = await fetchRouteFromDB(selectedRoomID, selectedRouteID); //Tutaj skonczone, teraz zaladowac do route i wyswietlic fajnie
        const userData = await getBasicUserInfoFromDB();
        setRoute(data);
        setPrivilegesGranted(checkIfUserCanAddRoute(userData));
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
                    <Box style={routeSetterPanelStyles.panel}>
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
                                        size="xl"
                                    />
                                    <Input
                                        placeholder={selectedRoute.difficulty}
                                        value={routeDifficulty}
                                        onChangeText={setRouteDifficulty}
                                        size="xl"
                                    />
                                    <Text>Routesetter: {selectedRoute.routeSetter}</Text>
                                    <Box>
                                        <Button>
                                            <Text>Modify route</Text>
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button>
                                            <Text>Delete route</Text>
                                        </Button>
                                    </Box>
                                </Box>
                            )}

                            <Box>
                                <Button onPress={() => navigation.goBack()}>
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