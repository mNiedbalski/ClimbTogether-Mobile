import React, { useState, useEffect, useCallback } from 'react';
import { NativeBaseProvider, Text, Box, Button, Column, Center, Row, Select, ScrollView } from 'native-base';
import defaultStyles from '../../../AppStyles.style';
import { fetchUsersNameSurnameIDFromDB } from '../../databaseFunctions/userFunctions';
import { giveRouteSetterRole, revokeRouteSetterRole } from '../../databaseFunctions/userFunctions';
const AdminStaffPanel = ({ navigation }) => {
    const [selectedUser, setSelectedUser] = useState('');
    const [isUserSelected, setIsUserSelected] = useState(false);
    const [doneChanges, setDoneChanges] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => { //It is called at least twice, so it is not a good solution
            const data = await fetchUsersNameSurnameIDFromDB();
            setUsers(data);
            setDoneChanges(false);
        }
        fetchUsers();
    }, [doneChanges]);
    useEffect(() => {
        console.log(users);
    }, [users]);
    return (
        <Box style={defaultStyles.componentWrapper}>
            <Box style={[defaultStyles.defaultContainer, { width: '100%' }]}>
                <Center>
                    <Column>
                        <ScrollView style={[defaultStyles.scrollView, {}]}>
                            <Column space={5}>
                                {users && (
                                    users.map((browsedUser) => (
                                        browsedUser.isAdmin === false && (
                                            <Box style={defaultStyles.scrollViewElement} key={browsedUser.id}>
                                                <Box>
                                                    <Button
                                                        style={defaultStyles.defaultButton}
                                                        onPress={() => {
                                                            setSelectedUser(browsedUser);
                                                            setIsUserSelected(true);

                                                        }}
                                                    >
                                                        {browsedUser.isRoutesetter === true ? (
                                                            <Text color={"white"} > {browsedUser.surname}, {browsedUser.name}, {browsedUser.id}</Text>
                                                        ) :
                                                            (
                                                                <Text> {browsedUser.surname}, {browsedUser.name}, {browsedUser.id}</Text>
                                                            )
                                                        }
                                                    </Button>
                                                </Box>
                                            </Box>
                                        )
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
                                        {selectedUser.isRoutesetter ? (
                                            <Button onPress={() => {
                                                revokeRouteSetterRole(selectedUser.id);
                                                setDoneChanges(true);
                                            }}>
                                                <Text>Revoke routesetter role</Text>
                                            </Button>
                                        ) : (
                                            <Button onPress={() => {
                                                giveRouteSetterRole(selectedUser.id);
                                                setDoneChanges(true);
                                            }}>
                                                <Text>Give routesetter role</Text>
                                            </Button>
                                        )}
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