import { Pressable, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

import SocialScreen from '../screens/socialFlow/SocialScreen';
import GroupInformationScreen from '../screens/socialFlow/GroupInformationScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ProfileScreen from '../screens/profileFlow/ProfileScreen';
import EditProfileScreen from '../screens/profileFlow/EditProfileScreen';

const Stack = createStackNavigator();

export default function SocialStack({ navigation }) {

  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: true,
      })}>
      <Stack.Screen name="Social" component={SocialScreen}
        options={() => ({
          title: 'Social',
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Social Profile')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Profile </Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Chats')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Chats </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="Group Information" component={GroupInformationScreen} />
      <Stack.Screen name="Social Profile" component={ProfileScreen}
        options={() => ({
          title: 'My Profile',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Social Edit Profile')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Edit </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="Social Edit Profile" component={EditProfileScreen}
        options={() => ({
          title: 'Edit Profile',
        })}
      />
      <Stack.Screen name="Chats" component={ChatsScreen} />
    </Stack.Navigator>
  );
}
