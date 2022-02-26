import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen({ route, navigation }) {

  return (
    <View style={styles.container}>
      <Text>{route.params.userProfile.name}</Text>
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
