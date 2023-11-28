import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './src/components/HomePage/HomePage';
import SelectRoute from './src/components/SelectRoute/SelectRoute';
import Settings from './src/components/Settings/Settings';
import RecordClimbing from './src/components/RecordClimbing/RecordClimbing';
import styles from './AppStyles.style';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
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
            name="Record Climbing"
            component={RecordClimbing}
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
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

