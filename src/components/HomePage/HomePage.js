import React, { useState, useEffect, useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { NativeBaseProvider, Text, Box, Row, Column, Center, Button, Spinner, Image, Icon, Pressable, Link } from 'native-base';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import homePageStyles from './HomePage.style';
import defaultStyles from '../../../AppStyles.style';
import signInPageStyles from '../../../assets/climber-pfp.png';
import { getBasicUserInfoFromDB, getRoutesCompletedCountFromDB } from '../../databaseFunctions/fetchingFunctions';
import { parseUserExp } from './HomePageFunctions';
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from '../../../App'
import { Alert } from 'react-native';
//TODO: Add loading indicator if data hasnt been loaded yet
//TODO: Add user profile pictures

import { doc, collection, set, addDoc } from 'firebase/firestore';

const HomePage = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [attemptsFinished, setAttemptsFinished] = useState(0);
    const fetchAttemptsInfo = async () => {
        const amountOfAttemptsFinished = await getRoutesCompletedCountFromDB();
        setAttemptsFinished(amountOfAttemptsFinished);
    };
    const fetchUser = async () => {
        const loadedUser = await getBasicUserInfoFromDB();
        setUser(loadedUser);
    };
    const fetchData = () => {
        fetchUser();
        fetchAttemptsInfo();
    }
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );
    useEffect(() => {
        console.log(user);
    }, [user]);
    
    const handleLogoInfo = () => {
        Alert.alert("Logo info", "Climbing icons created by Leremy - Flaticon");
    }
    

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out");
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    };

    return (
        <NativeBaseProvider>
            <Box style={defaultStyles.componentWrapper}>
                <Box style={homePageStyles.statsPanel}>
                    <Pressable onPress={handleLogout} style={{ position: 'absolute', right: '0%', top: '3%' }}>
                        <Row>
                            <Box style={{ marginRight: "10%", marginTop: "3%" }}>
                                <Text>
                                    Log out
                                </Text>
                            </Box>
                            <Box>
                                <AntDesign name="login" size={30} color="black" />
                            </Box>
                        </Row>
                    </Pressable>
                    {user ? (
                        <Column space={2}>
                            <Box style={{ marginTop: '25%' }}>
                                <Row>
                                    <Box style={{ width: '50%' }} >
                                        <Center>
                                            <Image
                                                source={require('../../../assets/climber-pfp.png')}
                                                size={'xl'}
                                            />
                                            <Pressable onPress={handleLogoInfo} style={{ left: "30%" }}>
                                                <AntDesign name="infocirlceo" size={10} color="black" />
                                            </Pressable>
                                        </Center>
                                    </Box>
                                    <Column>
                                        <Box style={{ marginTop: '15%' }}>
                                            <Text fontSize={20}>{user.name}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontSize={30} bold >{user.surname}</Text>
                                        </Box>
                                    </Column>
                                </Row>
                            </Box>
                            <Box style={{ marginTop: '10%' }}>
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
                                        <Text fontSize={20} color={'white'} >
                                            {parseUserExp(user.experience_points)}
                                        </Text>
                                    </Center>
                                </Box>
                            </Box>
                            <Row space={4} style={{ marginLeft: '5%', marginTop: '5%' }}>
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
                                        <Text> {user.hardest_difficulty}</Text>
                                    </Box>
                                </Column>
                            </Row>
                        </Column>
                    ) : (
                        <Center>
                            <Spinner accessibilityLabel="Loading user info"
                                color="#EEB959"
                                size="lg"
                            />
                        </Center>
                    )}

                </Box>
                <Center>
                    <Button style={[defaultStyles.defaultButton, { marginTop: '5%', width: '85%' }]}
                        onPress={() => navigation.navigate('Route Setter Panel')}
                    >Browse Routes</Button>
                </Center>
                {/* <Button onPress={addTestRoutes}>
                    Add some data
                </Button> */}

            </Box>

        </NativeBaseProvider>
    );
};

export default HomePage;
