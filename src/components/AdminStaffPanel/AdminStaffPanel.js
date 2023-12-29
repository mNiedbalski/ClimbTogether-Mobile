import React, { useState, useEffect, useCallback } from 'react';
import { NativeBaseProvider, Text, Box, Button, Column, Center, Row, Select, ScrollView } from 'native-base';
import defaultStyles from '../../../AppStyles.style';
import { fetchUsersNameSurnameIDFromDB } from '../../databaseFunctions/userFunctions';
const AdminStaffPanel = ({ navigation }) => {
    const [selectedUser, setSelectedUser] = useState('');
    const [isUserSelected, setIsUserSelected] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchGyms = async () => {
            const data = await fetchUsersNameSurnameIDFromDB();
            setUsers(data);
        }
        fetchGyms();
    }, []);
    useEffect(() => {
        console.log(users);
    }, [users]);
    return (
        <Box style={defaultStyles.componentWrapper}>
            <Box style={[defaultStyles.defaultContainer, { width: '100%' }]}>
                <Center>
                    <Column>
                        <ScrollView style={[defaultStyles.scrollView, {backgroundColor: "red"}]}>
                            <Column space={5}>
                                {users && (

                                    users.map((browsedUser) => (
                                        <Box style={defaultStyles.scrollViewElement} key={browsedUser.id}>
                                            <Box>
                                                <Button
                                                    style={defaultStyles.defaultButton}
                                                    onPress={() => {
                                                        setSelectedUser(browsedUser);
                                                        setIsUserSelected(true);

                                                    }}
                                                >
                                                    <Box>
                                                        <Text color={"white"} > {browsedUser.surname}, {browsedUser.name}, {browsedUser.id}</Text>
                                                    </Box>
                                                </Button>
                                            </Box>
                                        </Box>
                                    ))
                                )}
                            </Column>
                        </ScrollView>
                        {isUserSelected && (
                            <Center>
                                <Box>
                                    <Column space={3}>
                                        <Text>Selected user:</Text>
                                        <Row space={2}>
                                            <Text>{selectedUser.name}</Text>
                                            <Text>{selectedUser.surname}</Text>
                                        </Row>
                                        <Text>{selectedUser.id}</Text>
                                    </Column>
                                </Box>
                            </Center>
                        )}
                    </Column>
                </Center>
            </Box>
        </Box>

    )
};
export default AdminStaffPanel;