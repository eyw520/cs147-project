import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';

import EventsScreen from '../screens/eventsFlow/EventsScreen';
import CreateEventScreen from '../screens/eventsFlow/CreateEventScreen';
import FindEventsScreen from '../screens/eventsFlow/FindEventsScreen';

const Stack = createStackNavigator();

export default function EventsStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: true,
      })}>
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
      <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />
      <Stack.Screen name="FindEventsScreen" component={FindEventsScreen} />
    </Stack.Navigator>
  );
}
