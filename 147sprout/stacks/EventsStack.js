import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';

import EventsScreen from '../Screens/EventsFlow/EventsScreen';
import CreateEventScreen from '../Screens/EventsFlow/CreateEventScreen';
import FindEventsScreen from '../Screens/EventsFlow/FindEventsScreen';

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
