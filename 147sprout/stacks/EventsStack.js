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
import EventCancellationScreen from '../screens/eventsFlow/EventCancellationScreen';
import EventDeletionScreen from '../screens/eventsFlow/EventDeletionScreen';
import EventRestoreScreen from '../screens/eventsFlow/EventRestoreScreen';
import EventReviewScreen from '../screens/eventsFlow/EventReviewScreen';

import User from "../consts/user";

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
      {User.isReviewer ?
        <Stack.Screen name="Manage Events" component={ManageEventsScreen}
          options={() => ({
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.navigate('Events')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome name="code" size={30} color="gray" />
                <Text> Events </Text>
              </Pressable>
            ),
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Review Events')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome name="code" size={30} color="gray" />
                <Text> Review </Text>
              </Pressable>
            ),
          })}
        />
        :
        <Stack.Screen name="Manage Events" component={ManageEventsScreen}
          options={() => ({
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.navigate('Events')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome name="code" size={30} color="gray" />
                <Text> Events </Text>
              </Pressable>
            ),
          })}
        />
      }
      <Stack.Screen name="Create Events" component={CreateEventScreen} />
      <Stack.Screen name="Find Events" component={FindEventsScreen} />
      <Stack.Screen name="Cancel" component={EventCancellationScreen} />
      <Stack.Screen name="Register" component={EventRegistrationScreen} />
      <Stack.Screen name="Delete Event" component={EventDeletionScreen} />
      <Stack.Screen name="Restore Event" component={EventRestoreScreen} />
      {User.isReviewer &&
        <Stack.Screen name="Review Events" component={EventReviewScreen}
        options={() => ({
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Manage Events')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome name="code" size={30} color="gray" />
              <Text> Events </Text>
            </Pressable>
          ),
        })}
        />
      }

      <Stack.Screen name="AAPI Rights" component={EventsDisplayScreen} />
      <Stack.Screen name="Climate Change" component={EventsDisplayScreen} />
      <Stack.Screen name="Environmentalism" component={EventsDisplayScreen} />
      <Stack.Screen name="Feminism" component={EventsDisplayScreen} />
      <Stack.Screen name="Healthcare" component={EventsDisplayScreen} />
      <Stack.Screen name="Housing Justice" component={EventsDisplayScreen} />
      <Stack.Screen name="Virtual" component={EventsDisplayScreen} />

      <Stack.Screen name="New York City" component={EventsDisplayScreen} />
      <Stack.Screen name="San Francisco" component={EventsDisplayScreen} />
      <Stack.Screen name="Los Angeles" component={EventsDisplayScreen} />
      <Stack.Screen name="Seattle" component={EventsDisplayScreen} />
      <Stack.Screen name="Oakland" component={EventsDisplayScreen} />
    </Stack.Navigator>
  );
}
