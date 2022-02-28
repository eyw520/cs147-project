import { StyleSheet, Text, View } from 'react-native';

export default function FindEventsScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>FIND EVENTS SCREEN</Text>
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
