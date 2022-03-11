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

      {currFlower !== undefined ?
        <View style={styles.garden}>
          <Text style={styles.small}>{currFlower.flowerName}</Text>
          <Image style={styles.image} source={Images.garden[currFlower.imgLarge]} />

          <Text style={[styles.small, styles.progressInfo]}>Progress Until Bloom</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, {width: `${currFlower.growth}%`}]}>
              <Text style={[styles.small, styles.progressText]}>{currFlower.growth}%</Text>
            </View>
          </View>

          <Pressable style={styles.button} onPress={() => {navigation.navigate("Your Garden", {
            flowers: userFlowers
          })}}>
            <Text style={styles.body}>View Your Garden</Text>
          </Pressable>
        </View>
        :
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.subheader}>Welcome back to <Text style={{fontStyle: "italic"}}>sprout</Text>, {USER.name}!</Text>
            <Text style={styles.body}>Select a tab below to explore.</Text>
          </View>
          <Text style={[styles.noGarden, styles.body]}>You have no plants in the garden — attend events to receive flowers from organizers!</Text>
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    ...Layout.container,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  garden: {
    ...Layout.container,
    alignItems: "center",
    width: 300
  },
  image: {
    ...Layout.image,
    marginVertical: 20,
    height: 300,
    width: 300,
  },
  button: {
    ...Layout.button,
    width: "100%",
    paddingVertical: 20,
    borderRadius: 30
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
  small: {
    ...Typography.small,
    fontSize: 12,
    lineHeight: 12
  },
  noGarden: {
    marginBottom: 40
  },
  progressInfo: {
    color: Colors.gray,
    marginTop: 20
  },
  progressBar: {
    ...Layout.button,
    backgroundColor: Colors.darkGreen,
    borderColor: Colors.pink,
    borderWidth: 4,
    marginVertical: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: "100%",
  },
  progress: {
    ...Layout.button,
    backgroundColor: Colors.green,
    borderWidth: 0,
    alignSelf: "flex-start",
  },
  progressText: {
    color: Colors.white,
    alignSelf: "flex-end"
  }
});
