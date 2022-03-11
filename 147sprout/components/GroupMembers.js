import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Colors, Layout, Typography } from "../styles";
import * as Images from "../assets/images/";

import USER from "../consts/user";

export default function GroupMembers({ members }) {
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);

  const retrieveProfiles = () => {
    let ls = []
    members.forEach(async (id) => {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        ls = [...ls, docSnap.data()]
      }
      ls.sort((a, b) => b.name.charAt(0) < a.name.charAt(0))
      setProfiles(ls)
    });
  }

  useEffect(() => {
    retrieveProfiles();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        {item.id !== USER.id ?
          <Pressable onPress={() => {navigation.navigate("View Profile", {
            userData: item
          })}}>
            <View style={styles.member}>
              <Image style={styles.image} source={Images.profiles[item.img]} />
              <Text style={styles.body}>{item.name}, </Text>
              <Text style={styles.pronouns}>{item.pronouns}</Text>
            </View>
          </Pressable>
          :
          <View style={styles.member}>
            <Image style={styles.image} source={Images.profiles[item.img]} />
            <Text style={styles.body}>{item.name}, </Text>
            <Text style={styles.pronouns}>{item.pronouns}</Text>
          </View>
        }
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={profiles}
        renderItem={renderItem}
      />
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
  member: {
    ...Layout.container,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    marginBottom: 10
  },
  image: {
    ...Layout.image,
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10
  },
  body: {
    ...Typography.body,
  },
  pronouns: {
    ...Typography.body,
    color: Colors.gray,
    textTransform: "lowercase"
  },
});
