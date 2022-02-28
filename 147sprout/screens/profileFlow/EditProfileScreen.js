import { StyleSheet, Text, View } from 'react-native';

export default function EditProfileScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>EDIT PROFILE</Text>
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
