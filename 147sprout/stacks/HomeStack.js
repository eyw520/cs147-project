import { Pressable, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../screens/homeFlow/HomeScreen';
import ProfileScreen from '../screens/profileFlow/ProfileScreen';
import EditProfileScreen from '../screens/profileFlow/EditProfileScreen';
import FriendsDisplayScreen from '../screens/profileFlow/FriendsDisplayScreen';
import ViewProfileScreen from '../screens/profileFlow/ViewProfileScreen';
import UserGroupsDisplayScreen from '../screens/profileFlow/UserGroupsDisplayScreen';
import ViewFlowerScreen from '../screens/gardenFlow/ViewFlowerScreen';
import YourGardenScreen from '../screens/gardenFlow/YourGardenScreen';
import SettingsScreen from '../screens/homeFlow/SettingsScreen';

const Stack = createStackNavigator();

export default function HomeStack({ navigation }) {

  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: true,
      })}>
      <Stack.Screen name="Home" component={HomeScreen}
        options={() => ({
          title: 'Home',
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Home Profile')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Profile </Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Settings </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="Home Profile" component={ProfileScreen}
        options={() => ({
          title: 'My Profile',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Home Edit Profile')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Edit </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="Home Edit Profile" component={EditProfileScreen}
        options={() => ({
          title: 'Edit Profile',
        })}
      />
      <Stack.Screen name="Your Friends" component={FriendsDisplayScreen}/>
      <Stack.Screen name="View Profile" component={ViewProfileScreen} />
      <Stack.Screen name="View Flower" component={ViewFlowerScreen} />
      <Stack.Screen name="Your Garden" component={YourGardenScreen} />
      <Stack.Screen name="View User Groups" component={UserGroupsDisplayScreen}/>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
