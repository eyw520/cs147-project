import { Pressable, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../screens/homeFlow/HomeScreen';
import ProfileStack from './ProfileStack';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

export default function HomeStack({ route, navigation }) {

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
              onPress={() => navigation.navigate('ProfileStack')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Profile </Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('SettingsScreen')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Settings </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="ProfileStack" component={ProfileStack} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
