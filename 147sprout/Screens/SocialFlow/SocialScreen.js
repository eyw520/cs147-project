import { StyleSheet, Text, View } from 'react-native';

export default function SocialScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>SOCIAL</Text>
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
