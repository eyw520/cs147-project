import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { collection, doc, getDocs, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

import HomeStack from './stacks/HomeStack';
import EventsStack from './stacks/EventsStack';
import SocialStack from './stacks/SocialStack';

import USER from "./consts/user";

const Tab = createBottomTabNavigator();

export default function App() {
  // allow easily adding new users for demo & testing purposes.
  const checkUser = async () => {
    const docRef = doc(db, "users", USER.id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", USER.id), {
        id: USER.id,
        name: USER.name,
        username: USER.username,
        pronouns: USER.pronouns,
        friends: USER.friends,
        interests: USER.interests,
        groups: USER.groups,
        skills: USER.skills,
        locations: USER.locations,
        isReviewer: USER.isReviewer,
        img: USER.img
      });
      console.log(`new user with id ${USER.id} created`)
    }
  };

  const checkGroups = async () => {
    const querySnapshot = await getDocs(collection(db, "groups"));
    querySnapshot.forEach(async (group) => {
      if (USER.groups.includes(group.id) && !group.data().members.includes(USER.id)) {
        await updateDoc(doc(db, "groups", group.id), {
          members: [...group.data().members, USER.id]
        });
      }
    })
  }

  useEffect(() => {
    checkUser();
    checkGroups();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
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
