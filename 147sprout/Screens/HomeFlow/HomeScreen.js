import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function HomeScreen({ route, navigation }) {

  return (
    <View style={styles.container}>
      <Text> route.params.name </Text>
      <Text>HOME</Text>
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
