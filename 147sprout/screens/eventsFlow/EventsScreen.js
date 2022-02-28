import { StyleSheet, Button, Text, View, SafeAreaView } from 'react-native';

export default function EventsScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Text>EVENTS</Text>

      <View>
        <Button
            title="Find Events"
            onPress={() => navigation.navigate("FindEventsScreen")}
        />
      </View>

    </SafeAreaView>
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
