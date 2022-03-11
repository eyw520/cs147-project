import { Pressable, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';

import { Colors, Layout, Typography } from "../styles";
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
      <Stack.Screen name="EventsScreen" component={EventsScreen}
        options={() => ({
          title: 'Events',
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Manage Events')}
              style={styles.topBar}>
              <Text style={styles.small}>Manage</Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Create Event')}
              style={styles.topBar}>
              <Text style={styles.small}>Create</Text>
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
                onPress={() => navigation.navigate('EventsScreen')}
                style={styles.topBar}>
                <Text style={styles.small}>Events</Text>
              </Pressable>
            ),
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Review Events')}
                style={styles.topBar}>
                <Text style={styles.small}>Review</Text>
              </Pressable>
            ),
          })}
        />
        :
        <Stack.Screen name="Manage Events" component={ManageEventsScreen}
          options={() => ({
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.navigate('EventsScreen')}
                style={styles.topBar}>
                <Text style={styles.small}>Events</Text>
              </Pressable>
            ),
          })}
        />
      }
      <Stack.Screen name="Create Event" component={CreateEventScreen} />
      <Stack.Screen name="Find Events" component={FindEventsScreen} />
      <Stack.Screen name="Cancel" component={EventCancellationScreen} />
      <Stack.Screen name="Register" component={EventRegistrationScreen} />
      <Stack.Screen name="Delete Event" component={EventDeletionScreen} />
      <Stack.Screen name="Restore Event" component={EventRestoreScreen} />
      {User.isReviewer &&
        <Stack.Screen name="Review Events" component={EventReviewScreen}/>
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
    fontSize: 11,
    lineHeight: 11,
    color: Colors.gray,
    marginVertical: 4
  }
});
