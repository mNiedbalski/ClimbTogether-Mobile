
import React, { Component } from 'react';
import { Container, Content, Text, Box, NativeBaseProvider } from 'native-base';

class Settings extends Component {
  render() {
    return (
      <NativeBaseProvider>
        <Box>
          <Text>Settings</Text>
        </Box>
      </NativeBaseProvider>
    );
  }
}

export default Settings;
