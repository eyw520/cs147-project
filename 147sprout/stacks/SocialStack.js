import { Pressable, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

import SocialScreen from '../screens/socialFlow/SocialScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ProfileStack from './ProfileStack';

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
      <Stack.Screen name="ProfileStack" component={ProfileStack} />
      <Stack.Screen name="Chats" component={ChatsScreen} />
    </Stack.Navigator>
  );
}
