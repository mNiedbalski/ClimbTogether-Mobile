import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Text, Button, Input } from 'native-base';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { getBasicUserInfoFromDB } from '../../databaseFunctions/fetchingFunctions';
import defaultStyles from '../../../AppStyles.style';
const EditProfile = ({ navigation }) => {
    const [user, setUser] = useState({});
    let [name, setName] = useState({});
    let [surname, setSurname] = useState({});
    let [weight, setWeight] = useState({});
    let [height, setHeight] = useState({});
    let [sex, setSex] = useState({});
    let [birthday, setBirthday] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getBasicUserInfoFromDB();
            setUser(user);
        }
        fetchUser();
    }, []);
    useEffect(() => {
        console.log("userInfo", user);
    }, [user]);

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                <Box style={defaultStyles.componentWrapper}>
                    <Box style={defaultStyles.defaultContainer}>
                        <Text>First Name</Text>
                        <Input placeholder={user.name}
                            value={name}
                            onChangeText={setName}
                            size="xl"
                        />
                        <Text>Last Name</Text>
                        <Input placeholder={user.surname}
                            value={surname}
                            onChangeText={setSurname}
                            size="xl"
                        />
                        <Text>Weight</Text>
                        <Input
                            value={weight}
                            onChangeText={setWeight}
                            size="xl"
                        >
                            {user.weight}
                        </Input>
                        <Text>Height</Text>
                        <Input
                            value={height}
                            onChangeText={setHeight}
                            size="xl"
                        >
                            {user.height}
                        </Input>
                        <Text>Sex</Text>
                        <Input placeholder={user.sex}
                            value={sex}
                            onChangeText={setSex}
                            size="xl"
                        />
                        <Text>Birthday</Text>
                        <Button>Save Changes</Button>
                    </Box>
                </Box>
            </TouchableWithoutFeedback>
        </NativeBaseProvider>
    );
}

export default EditProfile;