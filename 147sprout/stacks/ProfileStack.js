import { Pressable, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

import ProfileScreen from '../screens/profileFlow/ProfileScreen';
import EditProfileScreen from '../screens/profileFlow/EditProfileScreen';

const Stack = createStackNavigator();

export default function ProfileStack({ route, navigation }) {

  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: false,
      })}>
      <Stack.Screen name="Profile" component={ProfileScreen}
        options={() => ({
          title: 'My Profile',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Edit Profile')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Edit Profile </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
