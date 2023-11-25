import React from 'react';
import { Container, Content, NativeBaseProvider, Text, Box } from 'native-base';
import homePageStyles from './HomePage.style';
import {User} from '../../Entities/user';
import {Attempt} from '../../Entities/attempt';
//TEST DATA
const attempt1 = new Attempt(1,new Date('2023-11-25'),15.5,true,false);
const attempt2 = new Attempt(2,new Date('2023-11-25'),23.1,true,true);
const attempt3 = new Attempt(3,new Date('2023-11-25'),13.5,true,true);
const loggedUser = new User(1,'testUser','John','Doe','male',new Date('2001-04-10'),180,75,
[1, 2],
[attempt1, attempt2, attempt3]
);
//TEST DATA

const HomePage = ({ navigation }) => {
    return (
        <NativeBaseProvider>
            <Box style={homePageStyles.statsPanel} >
                <Text>{loggedUser.name}</Text>
                <Text>{loggedUser.surname}</Text>
                <Text>Routes completed {loggedUser.countCompletedRoutes()}</Text>

            </Box>
        </NativeBaseProvider>
    );
};

export default HomePage;
