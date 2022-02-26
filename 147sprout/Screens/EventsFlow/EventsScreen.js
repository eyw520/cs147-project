import { StyleSheet, Button, Text, View } from 'react-native';

export default function EventsScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>EVENTS</Text>
      
      <View>
        <Button
            title="Create Event"
            onPress={() => navigation.navigate("CreateEventScreen")}
        />
        <Button
            title="Find Events"
            onPress={() => navigation.navigate("FindEventsScreen")}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  }
});
