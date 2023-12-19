import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Text, FormControl, Button,Select, Input, Column } from 'native-base';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getBasicUserInfoFromDB } from '../../databaseFunctions/fetchingFunctions';
import defaultStyles from '../../../AppStyles.style';
const EditProfile = ({ navigation }) => {
    const [user, setUser] = useState({});
    let [name, setName] = useState('');
    let [surname, setSurname] = useState('');
    let [weight, setWeight] = useState('');
    let [height, setHeight] = useState('');
    let [sex, setSex] = useState('');
    let [birthday, setBirthday] = useState({});
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
        setDoneChanges(true);
    };
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
                    <Column space={5}>
                            <FormControl>
                                <FormControl.Label>First name</FormControl.Label>
                                <Input
                                    placeholder={user.name}
                                    value={name}
                                    onChangeText={setName}
                                    size="md"
                                />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Last name</FormControl.Label>
                                <Input
                                    placeholder={user.surname}
                                    value={surname}
                                    onChangeText={setSurname}
                                    size="md"

                                />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Height (cm)</FormControl.Label>
                                <Input
                                    placeholder={user.height + ''}
                                    value={height}
                                    onChangeText={setHeight}
                                    size="md"
                                    keyboardType="numeric" // Ta właściwość ogranicza klawiaturę do cyfr
                                />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Weight (kg)</FormControl.Label>
                                <Input
                                    placeholder={user.weight + ''}
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
                                    selectedValue={user.sex}
                                    onValueChange={setSex}
                                >
                                    <Select.Item label="Male" value="male" />
                                    <Select.Item label="Female" value="female" />
                                    <Select.Item label="Other" value="other" />
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Birthday</FormControl.Label>
                                <Button onPress={showDatePicker}  style={defaultStyles.defaultButton}>
                                    {user.birthday && (
                                    <Text>{user.birthday.toDateString()}</Text>
                                    )}
                                </Button>
                            </FormControl>
                            <DateTimePickerModal
                                //date={birthday}
                                isVisible={datePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                            <Box style={{ marginTop: '10%' }}>
                                <Button onPress={handleSaveChanges} isDisabled={!doneChanges}  style={defaultStyles.defaultButton}>
                                    <Text>Save Changes</Text>
                                </Button>
                            </Box>

                        </Column>
                    </Box>
                </Box>
            </TouchableWithoutFeedback>
        </NativeBaseProvider>
    );
}

export default EditProfile;