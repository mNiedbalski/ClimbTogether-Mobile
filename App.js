import 'react-native-gesture-handler';
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
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
//TODO: LOAD THIS DATA FROM DATABASE INSTEAD OF HARDCODING IT
export const userRole = new Role(1, "user");
export const adminRole = new Role(2, "admin");
export const attempt1 = new Attempt(1, new Date('2023-11-25'), 15.5, true, false);
export const attempt2 = new Attempt(2, new Date('2023-11-25'), 23.1, true, true);
export const attempt3 = new Attempt(3, new Date('2023-11-25'), 13.5, true, true);
export const testRoute1 = new Route(1, 'Test route', 1, 'V7', [attempt1, attempt2, attempt3], attempt3);
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
  return (
    <NavigationContainer>
      <NativeBaseProvider>
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
            name="Record Climbing Navigation"
            component={NavigateToRouteRecording}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons name="stats-chart" size={45} color='#424242' />
              ),
            }}
          />
          <Tab.Screen
            name="Select Route"
            component={SelectRoute}
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
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

