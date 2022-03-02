import { Pressable, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../screens/homeFlow/HomeScreen';
import ProfileScreen from '../screens/profileFlow/ProfileScreen';
import EditProfileScreen from '../screens/profileFlow/EditProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

export default function HomeStack({ route, navigation }) {

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
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
