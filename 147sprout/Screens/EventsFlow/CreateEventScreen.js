import { StyleSheet, Text, View } from 'react-native';

export default function CreateEventScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>CREATE EVENT SCREEN</Text>
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
