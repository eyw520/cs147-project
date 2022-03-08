import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Colors, Layout, Typography } from "../../styles";
import { FontAwesome5 } from '@expo/vector-icons';

export default function SettingsScreen() {

  return (
    <SafeAreaView style={styles.topContainer}>
      <FontAwesome5 name="tools" size={100} color={Colors.lightGray} />
      <Text style={styles.subheader}>[CURRENTLY UNIMPLEMENTED]</Text>
      <Text style={styles.body}>You'll be able to change specific preferences on this page!</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
    alignItems: "center",
    justifyContent: "center"
  },
  subheader: {
    ...Typography.subheader,
    marginTop: 20
  },
  body: {
    ...Typography.body,
    textAlign: "center"
  }
});
