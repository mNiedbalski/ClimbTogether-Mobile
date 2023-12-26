import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { NativeBaseProvider, Box, Button, Column, Select, Center, Row, Text, ScrollView, Spinner } from 'native-base';
import { fetchUsersFromDB } from '../../databaseFunctions/userFunctions';
import defaultStyles from '../../../AppStyles.style';
import { UsersGenderDataChart } from '../../StatisticalCharts/UsersGenderChart';
import { UsersAgeDataChart } from '../../StatisticalCharts/UsersAgeChart';
import { extractUsersGendersCount } from './AdminUsersPanelFunctions';
const AdminUsersPanel = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [genderChartReady, setGenderChartReady] = useState(false);
    const fetchUsers = async () => {
        const users = await fetchUsersFromDB();
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
    return (
        <Box style={defaultStyles.componentWrapper}>
            <Box style={defaultStyles.defaultContainer}>
                <Center>
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
                                <UsersAgeDataChart/>
                            </Box>
                        </Column>
                    </ScrollView>

                </Center>
            </Box>
        </Box>
    )
}

export default AdminUsersPanel;