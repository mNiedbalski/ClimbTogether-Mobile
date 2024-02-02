import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { NativeBaseProvider, Box, Button, Column, Select, Center, Row, Text, ScrollView, Spinner, Pressable } from 'native-base';
import { fetchUsersNameSurnameIDFromDB } from '../../databaseFunctions/userFunctions';
import defaultStyles from '../../../AppStyles.style';
import { UsersGenderDataChart } from '../../StatisticalCharts/UsersGenderChart';
import { UsersAgeDataChart } from '../../StatisticalCharts/UsersAgeChart';
import { UsersBMIChart } from '../../StatisticalCharts/UsersBMIChart';
import { AntDesign } from '@expo/vector-icons';
import {auth} from '../../../App';
import { signOut } from 'firebase/auth';
const AdminUsersPanel = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [genderChartReady, setGenderChartReady] = useState(false);
    const fetchUsers = async () => {
        const users = await fetchUsersNameSurnameIDFromDB();
        setUsers(users);
    }
    const fetchData = () => {
        fetchUsers();
    }
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );
    useEffect(() => {
        console.log("genderChart", genderChartReady);
    }, [genderChartReady]);
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
        <Box style={defaultStyles.componentWrapper}>
            <Box style={[defaultStyles.defaultContainer, { width: '100%', marginLeft: '2%' }]}>
                <Center>
                    <Pressable onPress={handleLogout} style={{ position: 'absolute', right: '0%', top: '0%' }}>
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
                    <ScrollView>
                        <Column space={7}>
                            <Box >
                                <Text>
                                    Users gender data
                                </Text>
                                <UsersGenderDataChart />
                            </Box>
                            <Box>
                                <Text>
                                    Users age data
                                </Text>
                                <UsersAgeDataChart />
                            </Box>
                            <Box>
                                <Text>
                                    Users BMI data
                                </Text>
                                <UsersBMIChart />
                            </Box>
                        </Column>
                    </ScrollView>

                </Center>
            </Box>
        </Box>
    )
}

export default AdminUsersPanel;