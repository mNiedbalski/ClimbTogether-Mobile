import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Spinner, Center } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SetupProfile from './src/components/SetupProfile/SetupProfile';
import HomePage from './src/components/HomePage/HomePage';
import SelectRoute from './src/components/SelectRoute/SelectRoute';
import Settings from './src/components/Settings/Settings';
import RecordClimbing from './src/components/RecordClimbing/RecordClimbing';
import SignInPage from './src/components/WelcomePage/WelcomePage';
import BrowseRoutes from './src/components/BrowseRoutes/BrowseRoutes';
import ViewRouteInfo from './src/components/viewRouteInfo/viewRouteInfo';
import EditProfile from './src/components/EditProfile/EditProfile';
import AdminGymsPanel from './src/components/AdminGymsPanel/AdminGymsPanel';
import AdminStaffPanel from './src/components/AdminStaffPanel/AdminStaffPanel';
import AdminUsersPanel from './src/components/AdminUsersPanel/AdminUsersPanel';
import AddNewRoute from './src/components/AddNewRoute/AddNewRoute';
import styles from './AppStyles.style';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

//Suppresing warnings in app xdd
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//FIREBASE 
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getBasicUserInfoFromDB } from './src/databaseFunctions/fetchingFunctions';
import { checkIfAdmin } from './src/components/WelcomePage/WelcomePageFunctions';

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
export function NavigateToDifferentPanels() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home Page" component={HomePage} />
      <Stack.Screen name="Route Setter Panel" component={BrowseRoutes} />
      <Stack.Screen name="View Route Info" component={ViewRouteInfo} />
      <Stack.Screen name="Add New Route" component={AddNewRoute} />
      <Stack.Screen name="Welcome Page" component={SignInPage} />
    </Stack.Navigator>
  )

}

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userSignUp, setUserSignUp] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    if (auth.currentUser.uid) {
      const isUserAdmin = await checkIfAdmin();
      console.log("isUserAdmin", isUserAdmin);
      setIsAdmin(isUserAdmin);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [userLoggedIn]);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {userLoggedIn && isAdmin ? (
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: styles.navigation,
              tabBarShowLabel: false,
              headerShown: false,
            }}
            initialRouteName="Admin Users Panel"
          >
            <Tab.Screen
              name="Admin Gyms Panel"
              component={AdminGymsPanel}
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome5 name="building" size={45} color='#424242' />
                ),
              }}
            />
            <Tab.Screen
              name="Admin Users Panel"
              component={AdminUsersPanel}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Feather name="users" size={45} color='#424242' />
                ),
              }}
            />
            <Tab.Screen
              name="Admin Staff Panel"
              component={AdminStaffPanel}
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome5 name="users-cog" size={45} color='#424242' />
                ),
              }}
            />
          </Tab.Navigator>
        ) : loading===true && userLoggedIn===true ? (
          <Center>
            <Spinner accessibilityLabel="Loading user info"
              color="#EEB959"
              size="lg"
            />
          </Center>
        ) : userLoggedIn ? (
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: styles.navigation,
              tabBarShowLabel: false,
              headerShown: false,
            }}
            initialRouteName="Navigate To Different Panels"
          >
            <Tab.Screen
              name="Edit Profile"
              component={EditProfile}
              options={{
                tabBarIcon: ({ focused }) => (
                  <AntDesign name="profile" size={45} color='#424242' />
                ),
              }}
            />
            <Tab.Screen
              name="Record Climbing Navigation"
              component={NavigateToRouteRecording}
              options={{
                tabBarIcon: ({ focused }) => (
                  <AntDesign name="play" size={60} color='#424242' />
                ),
              }}
            />
            <Tab.Screen
              name="Navigate To Different Panels"
              component={() => <NavigateToDifferentPanels setUserLoggedIn={setUserLoggedIn} />}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Entypo name="home" size={50} color='#424242' />
                ),
              }}
            />
          </Tab.Navigator>
        ) : userSignUp ? (
          <SetupProfile setUserLoggedIn={setUserLoggedIn} setLoading={setLoading} />
        ) : (
          <SignInPage setUserLoggedIn={setUserLoggedIn} setUserSignUp={setUserSignUp} setLoading={setLoading} />
        )}
       </NativeBaseProvider>
    </NavigationContainer>
  );
}

export { db, app, auth };