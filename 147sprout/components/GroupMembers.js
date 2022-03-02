import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

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
            <View>
              <Text> {item.name}, {item.pronouns} </Text>
              <Text> {item.img} </Text>
            </View>
          </Pressable>
          :
          <View>
            <Text> {item.name}, {item.pronouns} </Text>
            <Text> {item.img} </Text>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderStyle: "solid",
    borderWidth:  1
  },
});
