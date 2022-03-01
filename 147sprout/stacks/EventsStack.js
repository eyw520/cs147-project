import { Pressable, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import EventsScreen from '../screens/eventsFlow/EventsScreen';
import EventInformationScreen from '../screens/eventsFlow/EventInformationScreen';
import ManageEventsScreen from '../screens/eventsFlow/ManageEventsScreen';
import CreateEventScreen from '../screens/eventsFlow/CreateEventScreen';
import FindEventsScreen from '../screens/eventsFlow/FindEventsScreen';
import EventsDisplayScreen from '../screens/eventsFlow/EventsDisplayScreen';
import EventRegistrationScreen from '../screens/eventsFlow/EventRegistrationScreen';

const Stack = createStackNavigator();

export default function EventsStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: true,
      })}>
      <Stack.Screen name="Events" component={EventsScreen}
        options={() => ({
          title: 'Events',
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Manage Events')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Manage </Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Create Events')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Create </Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="Event Information" component={EventInformationScreen}/>
      <Stack.Screen name="Manage Events" component={ManageEventsScreen} />
      <Stack.Screen name="Create Events" component={CreateEventScreen} />
      <Stack.Screen name="Find Events" component={FindEventsScreen} />
      <Stack.Screen name="Register" component={EventRegistrationScreen} />

      <Stack.Screen name="AAPI Rights" component={EventsDisplayScreen} />
      <Stack.Screen name="Climate Change" component={EventsDisplayScreen} />
      <Stack.Screen name="Environmentalism" component={EventsDisplayScreen} />
      <Stack.Screen name="Feminism" component={EventsDisplayScreen} />
      <Stack.Screen name="Healthcare" component={EventsDisplayScreen} />
      <Stack.Screen name="Housing Justice" component={EventsDisplayScreen} />

      <Stack.Screen name="New York City" component={EventsDisplayScreen} />
      <Stack.Screen name="San Francisco" component={EventsDisplayScreen} />
      <Stack.Screen name="Los Angeles" component={EventsDisplayScreen} />
      <Stack.Screen name="Seattle" component={EventsDisplayScreen} />
      <Stack.Screen name="Oakland" component={EventsDisplayScreen} />
    </Stack.Navigator>
  );
}
