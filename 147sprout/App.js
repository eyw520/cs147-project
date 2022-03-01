import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import HomeStack from './stacks/HomeStack';
import EventsStack from './stacks/EventsStack';
import SocialStack from './stacks/SocialStack';

const Tab = createBottomTabNavigator();

export default function App() {
  // ensures DB consistency when adding data; make changes as necessary to confirm.
  const ensureConsistency = async () => {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const eventsSnapshot = await getDocs(collection(db, "events"));
    usersSnapshot.forEach((user) => {

    });
    eventsSnapshot.forEach((doc) => {

    });
  };


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeStack') {
              iconName = 'code'
            } else if (route.name === 'EventsStack') {
              iconName = 'code'
            } else if (route.name === 'SocialStack') {
              iconName = 'code'
            }
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="EventsStack" component={EventsStack} />
        <Tab.Screen name="SocialStack" component={SocialStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
