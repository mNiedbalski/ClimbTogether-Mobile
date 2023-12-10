import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Text, Box, Row, Column, Center } from 'native-base';
import homePageStyles from './HomePage.style';
import defaultStyles from '../../../AppStyles.style';
import { getBasicUserInfoFromDB, getRoutesCompletedCountFromDB, findMaxDifficultyRoute } from '../../firebaseFunctions/fetchingFunctions';


const HomePage = () => {
    const [user, setUser] = useState({});
    const [attemptsFinished, setAttemptsFinished] = useState(0);
    const [maxDifficultyRoute, setMaxDifficultyRoute] = useState(0);

    const fetchAttemptsInfo = async () => {
        const amountOfAttemptsFinished = await getRoutesCompletedCountFromDB();
        setAttemptsFinished(amountOfAttemptsFinished);
    };
    const fetchHardestRouteInfo = async () => {
        const hardestRoute = await findMaxDifficultyRoute();
        setMaxDifficultyRoute(hardestRoute);
    };
    const fetchUser = async () => {
        const loadedUser = await getBasicUserInfoFromDB();
        setUser(loadedUser);
    };
    useEffect(() => {
        fetchUser();
        fetchAttemptsInfo();
        fetchHardestRouteInfo();
    }, []);
    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <NativeBaseProvider>
            <Box style={defaultStyles.componentWrapper}>
                <Box style={homePageStyles.statsPanel}>
                    <Column space={2}>
                        <Box style={{ marginTop: '5%', height: '45%' }}>
                            <Row>
                                <Box style={{ width: '50%' }} />
                                <Box>
                                    <Box style={{ marginTop: '15%' }}>
                                        <Text fontSize={20}>{user.name}</Text>
                                    </Box>
                                    <Box>
                                        <Text fontSize={30} bold >{user.surname}</Text>
                                    </Box>
                                </Box>

                            </Row>
                        </Box>
                        <Box>
                            <Row>
                                <Box style={{ marginLeft: '5%' }}>
                                    <Text fontSize={30} bold>Level</Text>
                                </Box>
                                <Box style={{ bottom: '5%', marginLeft: '10%' }}>
                                    <Text fontSize={55}>{user.level}</Text>
                                </Box>
                            </Row>
                        </Box>
                        <Center>
                            <Text fontSize={17}> Experience progress to next level</Text>
                        </Center>
                        <Box style={{ width: '95%', height: '10%', backgroundColor: '#FDFCEC', marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, justifyContent: 'center' }}>
                            <Box style={{ width: `${user.experience_points * 10}%`, backgroundColor: '#424242', height: '100%', borderRadius: 10, justifyContent: 'center' }}>
                                <Center>
                                    <Text fontSize={20} color={'white'} >{user.experience_points}0%</Text>
                                </Center>
                            </Box>
                        </Box>
                        <Row space={8} style={{ marginLeft: '5%', marginTop: '5%' }}>
                            <Column>
                                <Box>
                                    <Text> Attempts finished: </Text>
                                </Box>
                                <Box style={homePageStyles.statField}>
                                    <Text> {attemptsFinished}</Text>
                                </Box>
                            </Column>
                            <Column>
                                <Box>
                                    <Text> Max difficulty completed: </Text>
                                </Box>
                                <Box style={homePageStyles.statField}>
                                    <Text> {maxDifficultyRoute.difficulty}</Text>
                                </Box>
                            </Column>
                        </Row>
                    </Column>
                </Box>
            </Box>

        </NativeBaseProvider>
    );
};

export default HomePage;
