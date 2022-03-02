import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';

import USER from "../../consts/user";

export default function HomeScreen({ route, navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 20}}>
        Welcome back to Sprout, {USER.name}!
      </Text>
      <Text>
        Select a tab below to explore.
      </Text>
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
