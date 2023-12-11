import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './src/components/HomePage/HomePage';
import SelectRoute from './src/components/SelectRoute/SelectRoute';
import Settings from './src/components/Settings/Settings';
import RecordClimbing from './src/components/RecordClimbing/RecordClimbing';
import SignInPage from './src/components/SignInPage/SignInPage';
import BrowseRoutes from './src/components/BrowseRoutes/BrowseRoutes';
import ViewRouteInfo from './src/components/viewRouteInfo/viewRouteInfo';

import styles from './AppStyles.style';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';

//Suppresing warnings in app xdd
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//FIREBASE 
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getBasicUserInfoFromDB } from './src/firebaseFunctions/fetchingFunctions';

const firebaseConfig = {
  apiKey: "AIzaSyC596Q0w1BBOXTPogfEGXORZVo_hLhkwTA",
  authDomain: "climb-together-e9cd9.firebaseapp.com",
  projectId: "climb-together-e9cd9",
  storageBucket: "climb-together-e9cd9.appspot.com",
  messagingSenderId: "59694459094",
  appId: "1:59694459094:web:28a866960eb10a1dfe4177",
  measurementId: "G-9DV7ZFBH2C"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export function NavigateToRouteRecording() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Select Route" component={SelectRoute} />
      <Stack.Screen name="Record Climbing" component={RecordClimbing} />
    </Stack.Navigator>
  )
}
export function NavigateToDifferentPanels(){
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home Page" component={HomePage} />
      <Stack.Screen name="Route Setter Panel" component={BrowseRoutes} />
      <Stack.Screen name="View Route Info" component={ViewRouteInfo} />
    </Stack.Navigator>
  )

}

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState({});


  const fetchUser = async () => {
    if (auth.currentUser.uid) {
      const loadedUser = await getBasicUserInfoFromDB(db);
      setUser(loadedUser);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);
  useEffect(() => {
    fetchUser();
  }, [userLoggedIn]);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {userLoggedIn ? (
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: styles.navigation,
              tabBarShowLabel: false,
              headerShown: false,
            }}
            initialRouteName="Navigate To Different Panels"
          >
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Ionicons name="stats-chart" size={45} color='#424242' />
                ),
              }}
            />
            <Tab.Screen
              name="Record Climbing Navigation"
              component={NavigateToRouteRecording}
              initialParams={{ user: user }}
              options={{
                tabBarIcon: ({ focused }) => (
                  <AntDesign name="play" size={60} color='#424242' />
                ),
              }}
            />
            <Tab.Screen
              name="Navigate To Different Panels"
              component={NavigateToDifferentPanels}
              initialParams={{ user: user }}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Entypo name="home" size={50} color='#424242' />
                ),
              }}
            />
          </Tab.Navigator>
        ) : (
          <SignInPage setUserLoggedIn={setUserLoggedIn} />
        )}
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export { db, app, auth };