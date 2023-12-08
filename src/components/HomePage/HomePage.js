import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Text, Box } from 'native-base';
import homePageStyles from './HomePage.style';
import { getBasicUserInfoFromDB } from '../../firebaseFunctions/fetchingFunctions';

const HomePage = () => {
    const [user, setUser] = useState({});
    const fetchUser = async () => {
        const loadedUser = await getBasicUserInfoFromDB();
        setUser(loadedUser);
    };
    useEffect(() => {
        fetchUser();
    }, []);
    useEffect(() => {
        console.log(user);
    }, [user]);

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
