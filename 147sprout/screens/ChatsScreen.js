import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function ChatsScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Text>CHATS</Text>
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
