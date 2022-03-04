import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Colors, Layout, Typography } from "../../styles";

export default function SettingsScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <Text> [CURRENTLY UNIMPLEMENTED] </Text>
      <Text> You'll be able to change specific preferences on this page! </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Layout.container,
    backgroundColor: Colors.white
  },
});
