import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Spinner, Center, Box, Text, FormControl, Button, Select, Input, Column } from 'native-base';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getBasicUserInfoFromDB } from '../../databaseFunctions/fetchingFunctions';
import { updateUserInDB } from '../../databaseFunctions/userFunctions';
import defaultStyles from '../../../AppStyles.style';
const EditProfile = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [sex, setSex] = useState('');
    const [birthday, setBirthday] = useState();
    const [parsedBirthday, setParsedBirthday] = useState('');
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [doneChanges, setDoneChanges] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };
    const handleConfirm = (date) => {
        setBirthday(date);
        hideDatePicker();
    };
    const handleSaveChanges = () => {
        updateUserInDB(name, surname, height, weight, sex, birthday);
    };
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getBasicUserInfoFromDB();
            setUser(user);
        }
        fetchUser();
    }, []);
    useEffect(() => {
        setName(user.name);
        setSurname(user.surname);
        setHeight(user.height);
        setWeight(user.weight);
        setSex(user.sex);
        setBirthday(user.birthday);
    }, [user]);

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                <Box style={defaultStyles.componentWrapper}>
                    <Box style={defaultStyles.defaultContainer}>
                        {birthday ? (
                            <Column space={5}>
                                <FormControl>
                                    <FormControl.Label>First name</FormControl.Label>
                                    <Input
                                        placeholder={name}
                                        value={name}
                                        onChangeText={setName}
                                        size="md"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Last name</FormControl.Label>
                                    <Input
                                        placeholder={surname}
                                        value={surname}
                                        onChangeText={setSurname}
                                        size="md"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Height (cm)</FormControl.Label>
                                    <Input
                                        placeholder={height + ''}
                                        value={height}
                                        onChangeText={setHeight}
                                        size="md"
                                        keyboardType="numeric" // Ta właściwość ogranicza klawiaturę do cyfr
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Weight (kg)</FormControl.Label>
                                    <Input
                                        placeholder={weight + ''}
                                        value={weight}
                                        onChangeText={setWeight}
                                        size="md"
                                        keyboardType="numeric" // Ta właściwość ogranicza klawiaturę do cyfr
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Gender</FormControl.Label>
                                    <Select
                                        mode="dropdown"
                                        selectedValue={sex}
                                        onValueChange={setSex}
                                    >
                                        <Select.Item label="Male" value="male" />
                                        <Select.Item label="Female" value="female" />
                                        <Select.Item label="Other" value="other" />
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Birthday</FormControl.Label>
                                    <Button onPress={showDatePicker} style={defaultStyles.defaultButton}>
                                        <Text>{birthday?.toDateString()}</Text>
                                    </Button>
                                </FormControl>
                                <DateTimePickerModal

                                    isVisible={datePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                                <Box style={{ marginTop: '10%' }}>
                                    <Button onPress={handleSaveChanges} style={defaultStyles.defaultButton}>
                                        <Text>Save Changes</Text>
                                    </Button>
                                </Box>

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
                </Box>
            </TouchableWithoutFeedback>
        </NativeBaseProvider>
    );
}

export default EditProfile;