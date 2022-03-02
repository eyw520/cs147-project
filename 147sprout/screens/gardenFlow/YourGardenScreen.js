import { StyleSheet, Pressable, Text, View, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";

import FlowerList from "../../components/FlowerList";

// provided in route a list of flowers, display to take up entire screen.
export default function YourGardenScreen({ navigation, route }) {
  const { flowers } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <FlowerList flowers={flowers} />
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
