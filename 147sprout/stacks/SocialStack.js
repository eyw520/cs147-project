import { Pressable, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';

import { Colors, Layout, Typography } from "../styles";
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
  let size = 16;
  let color = Colors.gray;

  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: true,
      })}>
      <Stack.Screen name="SocialScreen" component={SocialScreen}
        options={() => ({
          title: 'Social',
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Social Profile')}
              style={styles.topBar}>
              <FontAwesome5 name="user-alt" size={size} color={color} />
              <Text style={styles.small}>Profile</Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Messages')}
              style={styles.topBar}>
              <FontAwesome5 name="comment" size={size} color={color} />
              <Text style={styles.small}>Chats</Text>
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
              style={styles.topBar}>
              <Text style={styles.smallTextOnly}>Edit</Text>
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
      <Stack.Screen name="Your Groups" component={UserGroupsDisplayScreen} />
      <Stack.Screen name="View User Groups" component={UserGroupsDisplayScreen} />

      <Stack.Screen name="Discover Groups" component={GroupsDisplayScreen} />
      <Stack.Screen name="GroupsList" component={GroupsDisplayScreen}
        options={() => ({
          title: 'Your Groups',
      })}/>

      <Stack.Screen name="AAPI Rights" component={GroupInformationScreen} />
      <Stack.Screen name="Climate Change" component={GroupInformationScreen} />
      <Stack.Screen name="Environmentalism" component={GroupInformationScreen} />
      <Stack.Screen name="Feminism" component={GroupInformationScreen} />
      <Stack.Screen name="Healthcare" component={GroupInformationScreen} />
      <Stack.Screen name="Housing Justice" component={GroupInformationScreen} />

    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  topBar: {
    ...Layout.topContainer,
    ...Layout.topBar
  },
  container: {
    ...Layout.container,
  },
  small: {
    ...Typography.small,
    color: Colors.gray,
    marginVertical: 4
  },
  smallTextOnly: {
    ...Typography.small,
    fontSize: 11,
    lineHeight: 11,
    color: Colors.gray,
    marginVertical: 4,
  }
});
