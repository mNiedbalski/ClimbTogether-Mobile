import React from 'react';
import { NativeBaseProvider, Box, Button, Column, Select } from 'native-base';
import recordClimbingStyles from './RecordClimbing.style';

const RecordClimbing = ({ navigation }) => {
  let [gym, setGym] = React.useState('');
  let [room, setRoom] = React.useState('');
  let [route, setRoute] = React.useState('');
  return (
    <NativeBaseProvider>
      <Box style={recordClimbingStyles.buttonContainer}>
        <Column>
          <Box style={recordClimbingStyles.selectWrapper}>
            <Select
              placeholder='Select a gym'
              selectedValue='gym'
              placeholderTextColor='#424242'
              style={recordClimbingStyles.select}></Select>
          </Box>
          <Box style={recordClimbingStyles.selectWrapper}>
            <Select placeholder='Select room'
              style={recordClimbingStyles.select}
              placeholderTextColor='#424242'
              ></Select>
          </Box>
          <Box style={recordClimbingStyles.selectWrapper}>
            <Select placeholder='Select route'
              style={recordClimbingStyles.select}
              placeholderTextColor='#424242'
              ></Select>
          </Box>
        </Column>
      </Box>
    </NativeBaseProvider>
  );
}

export default RecordClimbing;
