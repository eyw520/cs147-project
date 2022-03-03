import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function FriendsList({ friends }) {
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);

  const retrieveProfiles = () => {
    let ls = []
    friends.forEach(async (id) => {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        ls = [...ls, docSnap.data()]
      }
      setProfiles(ls.sort((a, b) => b.name < a.name))
    });
  }

  useEffect(() => {
    retrieveProfiles();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => {navigation.navigate("View Profile", {
          userData: item
        })}}>
          <View>
            <Text> {item.name}, {item.pronouns} </Text>
            <Text> {item.img} </Text>
          </View>
        </Pressable>
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
