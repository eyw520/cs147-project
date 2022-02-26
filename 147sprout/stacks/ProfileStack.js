import { Pressable, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

import ProfileScreen from '../Screens/ProfileFlow/ProfileScreen';
import EditProfileScreen from '../Screens/ProfileFlow/EditProfileScreen';

const Stack = createStackNavigator();

export default function ProfileStack({ route, navigation }) {

  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: false,
      })}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}
        options={() => ({
          title: 'My Profile',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('EditProfileScreen')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Edit Profile </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
