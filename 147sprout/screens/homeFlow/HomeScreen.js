import { StyleSheet, Text, View, Pressable, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Colors, Layout, Typography } from "../../styles";

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
    <SafeAreaView style={styles.container}>
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
          <Text> {currFlower.flowerName} </Text>
          <Text> {currFlower.growth} </Text>

          <Pressable onPress={() => {navigation.navigate("Your Garden", {
            flowers: userFlowers
          })}}>
            <Text>
              View Your Garden
            </Text>
          </Pressable>
        </View>
        :
        <Text style={[styles.smallGarden, styles.body]}>You have no plants in the garden — attend events to receive flowers from organizers!</Text>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Layout.container
  },
  header: {
    ...Typography.header
  },
  subheader: {
    ...Typography.subheader
  },
  body: {
    ...Typography.body
  },
  smallGarden: {
    ...Layout.container,
    flex: 0.25
  },
  image: {
    marginVertical: 20
  }
});
