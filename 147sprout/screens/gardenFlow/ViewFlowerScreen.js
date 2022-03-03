import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React from "react";

export default function YourGardenScreen({ route }) {
  const { flowerData } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text> {flowerData.flowerName} </Text>
      <Text> {flowerData.flowerDescription} </Text>
      <Text> </Text>
      <Text> {flowerData.state} </Text>
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
