import { Pressable, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

import SocialScreen from '../screens/socialFlow/SocialScreen';
import GroupInformationScreen from '../screens/socialFlow/GroupInformationScreen';
import GroupsDisplayScreen from '../screens/socialFlow/GroupsDisplayScreen';
import MessagesScreen from '../screens/socialFlow/MessagesScreen';
import ChatScreen from '../screens/socialFlow/ChatScreen';
import ViewProfileScreen from '../screens/profileFlow/ViewProfileScreen';
import UserGroupsDisplayScreen from '../screens/profileFlow/UserGroupsDisplayScreen';
import ProfileScreen from '../screens/profileFlow/ProfileScreen';
import EditProfileScreen from '../screens/profileFlow/EditProfileScreen';
import FriendsDisplayScreen from '../screens/profileFlow/FriendsDisplayScreen';

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
              onPress={() => navigation.navigate('Messages')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Chats </Text>
            </Pressable>
          ),
        })}
      />
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
      <Stack.Screen name="View Profile" component={ViewProfileScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Your Friends" component={FriendsDisplayScreen} />
      <Stack.Screen name="View User Groups" component={UserGroupsDisplayScreen} />

      <Stack.Screen name="Discover Groups" component={GroupsDisplayScreen} />
      <Stack.Screen name="Your Groups" component={GroupsDisplayScreen} />

      <Stack.Screen name="AAPI Rights" component={GroupInformationScreen} />
      <Stack.Screen name="Climate Change" component={GroupInformationScreen} />
      <Stack.Screen name="Environmentalism" component={GroupInformationScreen} />
      <Stack.Screen name="Feminism" component={GroupInformationScreen} />
      <Stack.Screen name="Healthcare" component={GroupInformationScreen} />
      <Stack.Screen name="Housing Justice" component={GroupInformationScreen} />

    </Stack.Navigator>
  );
}
