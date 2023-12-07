import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Text, Box } from 'native-base';
import homePageStyles from './HomePage.style';
import { auth, db } from '../../../App';
import { getUserFromDB } from '../../firebaseFunctions/fetchingFunctions';

const HomePage = () => {
    const [user, setUser] = useState({});
    const fetchUser = async () => {
        if (auth.currentUser.uid) {
            const loadedUser = await getUserFromDB(db);
            setUser(loadedUser);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <NativeBaseProvider>
            {user ? (
                <Box style={homePageStyles.statsPanel}>
                    <Text>Name: {user.name}</Text>
                    <Text>Surname: {user.surname}</Text>
                    <Text>Height: {user.height}</Text>
                    <Text>Weight: {user.weight}</Text>
                    <Text>Level: {user.level}</Text>

                </Box>
            ) : (
                <Text>Loading...</Text>
            )}

        </NativeBaseProvider>
    );
};

export default HomePage;
