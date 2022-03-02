import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function GroupInformationScreen({ route, navigation }) {
  const { groupData } = route.params

  return (
    <SafeAreaView style={styles.container}>
      <Text>GROUP PAGE {groupData.groupName} </Text>
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
