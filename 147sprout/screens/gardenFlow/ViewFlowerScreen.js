import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native';
import React from "react";
import { Colors, Layout, Typography } from "../../styles";
import * as Images from "../../assets/images";

export default function YourGardenScreen({ route }) {
  const { flowerData } = route.params;

  return (
    <SafeAreaView style={styles.topContainer}>
      <Image style={styles.image} source={Images.garden[flowerData.imgLarge]} />
      <View style={styles.container}>
        <Text style={styles.subheader}>{flowerData.flowerName}</Text>
        <Text style={styles.body}>{flowerData.flowerDescription}</Text>
        <Text style={styles.small}>{flowerData.state}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
    alignItems: "center"
  },
  container: {
    ...Layout.container,
  },
  image: {
    ...Layout.image,
    marginVertical: 20,
    height: 300,
    width: 300,
  },
  subheader: {
    ...Typography.subheader,
    marginTop: 20
  },
  body: {
    ...Typography.body,
  },
  small: {
    ...Typography.small,
    fontSize: 12,
    lineHeight: 12,
    fontStyle: "italic",
    color: Colors.gray,
    marginTop: 20
  },
});
