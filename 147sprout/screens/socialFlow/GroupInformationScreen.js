import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function GroupInformationScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Text>SOCIAL</Text>
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
