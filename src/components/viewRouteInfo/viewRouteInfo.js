import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, Text, Box, Row, Column, Center, Button, Select, ScrollView } from 'native-base';
import defaultStyles from '../../../AppStyles.style';
import routeSetterPanelStyles from '../BrowseRoutes/BrowseRoutes.style'
import { fetchRouteFromDB } from '../../firebaseFunctions/fetchingFunctions';

const ViewRouteInfo = ({ route }) => {
    const [selectedRoomID, setRoomID] = useState(route.params.roomID);
    const [selectedRouteID, setRouteID] = useState(route.params.routeID);
    const [selectedRoute, setRoute] = useState({});
    fetchData = async () => {
        const data = await fetchRouteFromDB(selectedRoomID, selectedRouteID); //Tutaj skonczone, teraz zaladowac do route i wyswietlic fajnie
        setRoute(data);
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
                            <Box>
                                <Text>Route name: {selectedRoute.name}</Text>
                                <Text>Difficulty: {selectedRoute.difficulty}</Text>
                                <Text>Routesetter: {selectedRoute.routeSetter}</Text>
                            </Box>
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
                            <Box>
                                <Button>
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