import React, { useEffect, useState } from 'react';
import { Box, Input, FormControl, NativeBaseProvider, Select, Button, Text, Column } from 'native-base';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import defaultStyles from '../../../AppStyles.style';
const SetupProfile = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [sex, setSex] = useState('');
    const [birthday, setBirthday] = useState();
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

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
    useEffect(() => {
        setIsFormValid(
            name && name.trim() !== '' &&
            surname && surname.trim() !== '' &&
            height && height.trim() !== '' &&
            weight && weight.trim() !== '' &&
            birthday
        );
    }, [name, surname, height, weight, birthday]);
    useEffect(() => {
        console.log("birthday", birthday);
    }, [birthday]);
    const handleSaveProfile = () => {
        // Handle saving the profile data
    };

    return (
        <NativeBaseProvider>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                <Box style={defaultStyles.componentWrapper}>
                    <Box style={defaultStyles.defaultContainer}>
                        <Column space={5}>
                            <FormControl isRequired>
                                <FormControl.Label>First name</FormControl.Label>
                                <Input
                                    placeholder='Please enter your first name...'
                                    value={name}
                                    onChangeText={setName}
                                    size="md"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Last name</FormControl.Label>
                                <Input
                                    placeholder='Please enter your last name...'
                                    value={surname}
                                    onChangeText={setSurname}
                                    size="md"

                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Height (cm)</FormControl.Label>
                                <Input
                                    placeholder='Please enter your height...'
                                    value={height}
                                    onChangeText={setHeight}
                                    size="md"
                                    keyboardType="numeric" // Ta właściwość ogranicza klawiaturę do cyfr
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Weight (kg)</FormControl.Label>
                                <Input
                                    placeholder="Please enter your weight..."
                                    value={weight}
                                    onChangeText={setWeight}
                                    size="md"
                                    keyboardType="numeric" // Ta właściwość ogranicza klawiaturę do cyfr
                                />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Gender (Optional)</FormControl.Label>
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
                            <FormControl isRequired>
                                <FormControl.Label>Birthday</FormControl.Label>
                                <Button onPress={showDatePicker}>
                                    <Text>Select your birthday</Text>
                                </Button>
                            </FormControl>
                            <DateTimePickerModal
                                date={birthday}
                                isVisible={datePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                            <Box style={{ marginTop: '10%' }}>
                                <Button onPress={handleSaveProfile} isDisabled={!isFormValid}>
                                    <Text>Save Profile</Text>
                                </Button>
                            </Box>

                        </Column>
                    </Box>
                </Box>
            </TouchableWithoutFeedback>
        </NativeBaseProvider>
    );
};

export default SetupProfile;
