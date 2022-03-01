import { StyleSheet, Text, View, SafeAreaView} from 'react-native';

export default function EventRegistrationScreen({ route, navigation }) {
  const { eventData } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text>REGISTER SCREEN</Text>
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
