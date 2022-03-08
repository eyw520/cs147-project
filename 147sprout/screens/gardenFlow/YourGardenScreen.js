import { StyleSheet, SafeAreaView } from 'react-native';
import React from "react";
import { Colors, Layout, Typography } from "../../styles";

import FlowerList from "../../components/FlowerList";

// provided in route a list of flowers, display to take up entire screen.
export default function YourGardenScreen({ route }) {
  const { flowers } = route.params;

  return (
    <SafeAreaView style={styles.topContainer}>
      <FlowerList flowers={flowers} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
  },
  container: {
    ...Layout.container,
  },
});
