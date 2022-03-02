import { StyleSheet, Pressable, Text, View, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";

export default function YourGardenScreen({ navigation, route }) {
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
