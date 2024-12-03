import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import Screens
import WelcomeScreen from './src/welcomeScreen'; // Welcome Screen
import LoginSignUpScreen from './src/LoginSignUpScreen.js'; // Login/Signup Screen
import HomeScreen from './src/HomeScreen'; // Home Screen with map
import QuestionsScreen from './src/questions.js'; // Questionnaire Screen
import ProfileScreen from './src/ProfileScreen';  // profile Screen
import ForecastScreen from './src/ForecastScreen';  // forcast Screen

// Create Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator (Home, Profile, forcast)
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarStyle: { backgroundColor: '#FFFAEC' }, 
        tabBarActiveTintColor: '#4E4B3E', 
        tabBarInactiveTintColor: '#a39986', 
        tabBarLabelStyle: { fontSize: 12 }, 

      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name="map" 
              size={size} 
              color={focused ? "#4E4B3E" :"#a39986" }
            />
          ),

          title:"Home"
        }}
      />
      <Tab.Screen
        name="Forecast"
        component={ForecastScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name="sunny" 
              size={size} 
              color={focused ? "#4E4B3E" :"#a39986" } 
            />
          ),
        }}
      />

      <Tab.Screen 
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name="person" 
              size={size} 
              color={focused ? "#4E4B3E" :"#a39986" } 
            />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}

// Stack Navigator for managing screen flow
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Welcome Screen */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }} // Hide header for the welcome screen
        />
        {/* Login/Signup Screen */}
        <Stack.Screen
          name="LoginSignUp"
          component={LoginSignUpScreen}
          options={{ headerShown: false }} // Hide header for the login/signup screen
        />
        {/* User Questionnaire Screen */}
        <Stack.Screen
          name="User Questionnaire"
          component={QuestionsScreen}
          options={{ headerShown: false }} // Hide header for this screen
        />
        {/* Home Screen with Tab Navigation (Bottom Tabs) */}
        <Stack.Screen
          name="Home"
          component={MainTabs} // Switch to Tab Navigation after completing the questionnaire
          options={{ headerShown: false }} // Hide header for home screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
