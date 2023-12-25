import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { NativeBaseProvider, Box, Button, Column, Select, Center, Text } from 'native-base';
import { fetchUsersFromDB } from '../../databaseFunctions/userFunctions';
const AdminUsersPanel = ({ navigation }) => {
    const [users, setUsers] = useState([]);
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
        console.log(users);
    }, []);
    return (
        <Text>AdminPanel</Text>
    )
}

export default AdminUsersPanel;