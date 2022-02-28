import { Pressable, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import EventsScreen from '../screens/eventsFlow/EventsScreen';
import ManageEventsScreen from '../screens/eventsFlow/ManageEventsScreen';
import CreateEventScreen from '../screens/eventsFlow/CreateEventScreen';
import FindEventsScreen from '../screens/eventsFlow/FindEventsScreen';

const Stack = createStackNavigator();

export default function EventsStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: true,
      })}>
      <Stack.Screen name="EventsScreen" component={EventsScreen}
        options={() => ({
          title: 'Events',
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('ManageEventsScreen')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Manage </Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('CreateEventScreen')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Create </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="ManageEventsScreen" component={ManageEventsScreen} />
      <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />
      <Stack.Screen name="FindEventsScreen" component={FindEventsScreen} />
    </Stack.Navigator>
  );
}
