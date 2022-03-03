import { StyleSheet, Text, SafeAreaView } from 'react-native';

export default function EditProfileScreen() {

  return (
    <SafeAreaView style={styles.container}>
    <Text> [CURRENTLY UNIMPLEMENTED] </Text>
    <Text> You'll be able to modify user details on this page! </Text>
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
