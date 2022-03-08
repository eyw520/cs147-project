import { StyleSheet, Text, View, Pressable, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Colors, Layout, Typography } from "../../styles";
import * as Images from "../../assets/images";

import USER from "../../consts/user";

export default function HomeScreen({ navigation }) {
  const [userFlowers, setUserFlowers] = useState([])
  const [currFlower, setCurrFlower] = useState(undefined)

  const getUserFlowers = async () => {
    let ls = []
    const gardenRef = collection(db, "garden");
    const q = query(gardenRef, where("user", "==", USER.id));
    const queryResults = await getDocs(q);
    queryResults.forEach((doc) => { ls = [...ls, doc.data()] });
    setUserFlowers(ls)
    if (ls !== []) {
      setCurrFlower(ls.filter(item => item.state == "growing")[0])
    }
  };

  useEffect(() => {
    getUserFlowers();
  }, []);

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.container}>
        <Text style={styles.subheader}>
          Welcome back to Sprout, {USER.name}!
        </Text>
        <Text style={styles.body}>
          Select a tab below to explore.
        </Text>
      </View>

      {currFlower !== undefined ?
        <View style={styles.smallGarden}>
          <Text style={styles.body}>{currFlower.flowerName}</Text>
          <Text style={styles.body}>{currFlower.growth}</Text>
          <Image style={styles.image} source={Images.garden[currFlower.img]} />

          <Pressable style={styles.button} onPress={() => {navigation.navigate("Your Garden", {
            flowers: userFlowers
          })}}>
            <Text style={styles.body}>View Your Garden</Text>
          </Pressable>
        </View>
        :
        <Text style={[styles.smallGarden, styles.body]}>You have no plants in the garden — attend events to receive flowers from organizers!</Text>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
    justifyContent: "center"
  },
  container: {
    ...Layout.container,
    height: "60%",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    ...Layout.button
  },
  header: {
    ...Typography.header
  },
  subheader: {
    ...Typography.subheader
  },
  body: {
    ...Typography.body,
    textAlign: "center"
  },
  smallGarden: {
    ...Layout.container,
    height: "10%"
  },
  image: {
    ...Layout.image,
    marginVertical: 20,
    height: 300,
    width: 300
  }
});
