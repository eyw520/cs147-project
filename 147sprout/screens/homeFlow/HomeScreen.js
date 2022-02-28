import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';

export default function HomeScreen({ route, navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Text> route.params.name </Text>
      <Text>HOME</Text>
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
