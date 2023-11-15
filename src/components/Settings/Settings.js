
import React, { Component } from 'react';
import { Container, Content, Text, Box, NativeBaseProvider } from 'native-base';

const Settings = ({ navigation }) => {
  return (
      <NativeBaseProvider>
          <Box>
              <Text>Settings page</Text>
          </Box>
      </NativeBaseProvider>
  );
};

export default Settings;
