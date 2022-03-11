import { Pressable, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';

import { Colors, Layout, Typography } from "../styles";
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
  let size = 16;
  let color = Colors.gray;

  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: true,
      })}>
      <Stack.Screen name="HomeScreen" component={HomeScreen}
        options={() => ({
          title: 'Home',
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Home Profile')}
              style={styles.topBar}>
              <FontAwesome5 name="user-alt" size={size} color={color} />
              <Text style={styles.small}>Profile</Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              style={styles.topBar}>
              <FontAwesome5 name="cog" size={size} color={color} />
              <Text style={styles.small}>Settings</Text>
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
              style={styles.topBar}>
              <Text style={styles.smallTextOnly}>Edit</Text>
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
      <Stack.Screen name="Your Groups" component={UserGroupsDisplayScreen}/>
      <Stack.Screen name="View User Groups" component={UserGroupsDisplayScreen}/>
      <Stack.Screen name="Settings" component={SettingsScreen} />
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
