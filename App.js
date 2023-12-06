import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './src/components/HomePage/HomePage';
import SelectRoute from './src/components/SelectRoute/SelectRoute';
import Settings from './src/components/Settings/Settings';
import RecordClimbing from './src/components/RecordClimbing/RecordClimbing';
import SignInPage from './src/components/SignInPage/SignInPage';
import styles from './AppStyles.style';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Route } from './src/Entities/route';
import { User } from './src/Entities/user';
import { Attempt } from './src/Entities/attempt';
import { Achievement } from './src/Entities/achievement';
import { Role } from './src/Entities/role';
import { Room } from './src/Entities/room';
import { Gym } from './src/Entities/gym';
import {getAuth} from 'firebase/auth';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//FIREBASE 
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, getDocs, getDoc, doc } from 'firebase/firestore/lite';

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




//TODO: LOAD THIS DATA FROM DATABASE INSTEAD OF HARDCODING IT
export const userRole = new Role(1, "user");
export const adminRole = new Role(2, "admin");
export const attempt1 = new Attempt(1, new Date('2023-11-25'), 15.5, true, false);
export const attempt2 = new Attempt(2, new Date('2023-11-25'), 23.1, true, true);
export const attempt3 = new Attempt(3, new Date('2023-11-25'), 13.5, true, true);
export const testRoute1 = new Route(1, 'Test route', 1, 'V7', [attempt1, attempt2, attempt3]);
export const testRoom = new Room(1, 'Main room', [testRoute1]);
export const testGym = new Gym(1, 'Gabriela Narutowicza 51, 41-200 Sosnowiec', 'Poziom 450', [testRoom]);
export const achievements1 = new Achievement(1, 'First route', 'Complete your first route!', new Date('2023-11-25'));
export const loggedUser = new User(1, 'testUser', 'Michał', 'Niedbalski', 'male', new Date('2001-04-10'), 180, 75,
  [userRole, adminRole],
  [attempt1, attempt2, attempt3],
  30,
  1,
  [achievements1]);

//END OF TEST DATA
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

export default function App() {
  const [userId, setUserId] = useState(''); //TODO: CHANGE THIS TO NULL
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  async function getUserFromDB(db) {
    console.log(userId);
    const userDocRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDocRef);
    const fetchedUser = await parseUser(userSnapshot.data());
    return fetchedUser;
  }
  
  async function parseUser(userData) {
    let parsedUser = new User(); 
    parsedUser.id = userData.id;
    parsedUser.email = userData.email;
    parsedUser.password = userData.password;
    parsedUser.name = userData.name;
    parsedUser.surname = userData.surname;
    parsedUser.experience_points = userData.experience_points;
    parsedUser.height = userData.height;
    parsedUser.weight = userData.weight;
    parsedUser.level = userData.level;
    parsedUser.sex = userData.sex;
    parsedUser.birthday = new Date(userData.birthday.toDate());
    const rolesDataPromises = userData.roles.map(async (roleRef) => {
      const roleDoc = await getDoc(roleRef);
      const roleData = roleDoc.data();
      return new Role(roleRef.id, roleData.role_name);
    });
    const attemptsDataPromises = userData.attempts.map(async (attemptRef) => {
      const attemptDoc = await getDoc(attemptRef);
      const attemptData = attemptDoc.data();
      return new Attempt(attemptRef.id, new Date(attemptData.attempt_time.toDate()), attemptData.completion_time, attemptData.zone_reached, attemptData.top_reached);
    });
  
    const achievementsDataPromises = userData.achievements.map(async (achievementRef) => {
      const achievementDoc = await getDoc(achievementRef);
      const achievementData = achievementDoc.data();
      return new Achievement(achievementRef.id, achievementData.name, achievementData.criteria, new Date(achievementData.date_acquired.toDate()));
    });
    const rolesDataArray = await Promise.all(rolesDataPromises);
    const achievementsDataArray = await Promise.all(achievementsDataPromises);
    const attemptsDataArray = await Promise.all(attemptsDataPromises);
  
    parsedUser.attempts = attemptsDataArray;
    parsedUser.achievements = achievementsDataArray;
    parsedUser.roles = rolesDataArray;
    return parsedUser;
  }

  const fetchUser = async() => {
    if (userId) {
      const loadedUser = await getUserFromDB(db);
      setUser(loadedUser);
    }
  };

  useEffect(() => {
    console.log("aktualne user id", userId);
    fetchUser();
  }, [userId]);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {userLoggedIn ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.navigation,
            tabBarShowLabel: false,
            headerShown: false,
            initialRouteName: "Home Page",
          }
          }
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
            options={{
              tabBarIcon: ({ focused }) => (
                <AntDesign name="play" size={60} color='#424242' />
              ),
            }}
          />

          <Tab.Screen
            name="Home Page"
            component={HomePage}
            options={{
              tabBarIcon: ({ focused }) => (
                <Entypo name="home" size={50} color='#424242' />
              ),
            }}
          />
        </Tab.Navigator>
        ) : (
          <SignInPage setUserLoggedIn={setUserLoggedIn} setUserId={setUserId} />
        )}
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export {db,app, auth};