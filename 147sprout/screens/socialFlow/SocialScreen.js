import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

import GroupList from "../../components/GroupList";

import USER from "../../consts/user";

export default function SocialScreen({ navigation }) {
  const [allGroups, setAllGroups] = useState([])
  const [userMemberGroups, setUserMemberGroups] = useState([])
  const [userDiscoverGroups, setUserDiscoverGroups] = useState([])

  const getAllGroups = async () => {
    const querySnapshot = await getDocs(collection(db, "groups"));
    console.log("read collection query performed.")
    let ls = []
    querySnapshot.forEach((doc) => { ls = [...ls, doc.data()] });
    setAllGroups(ls)
  };

  const getUserGroups = () => {
    setUserMemberGroups(allGroups.filter(item => item.members.includes(USER.id)))
    setUserDiscoverGroups(allGroups.filter(item => !item.members.includes(USER.id)))
  };

  useEffect(() => {
    navigation.addListener(
          'focus',
          payload => {
              getAllGroups();
          }
      );
    }, [])

  useEffect(() => {
    getUserGroups();
  }, [allGroups]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={{fontSize: 20}}> Discover New Groups </Text>
        <Pressable onPress={() => {navigation.navigate("Discover Groups", {
            groupList: userDiscoverGroups,
            title: "Discover Groups"
          })}}>
          <Text style={{fontSize: 20}}> View All </Text>
        </Pressable>
        <GroupList groups={userDiscoverGroups} />
      </View>

      <View style={styles.container}>
        <Text style={{fontSize: 20}}> Groups You're A Member Of </Text>
        <Pressable onPress={() => {navigation.navigate("Your Groups", {
            groupList: userMemberGroups,
            title: "Your Groups"
          })}}>
          <Text style={{fontSize: 20}}> View All </Text>
        </Pressable>
        <GroupList groups={userMemberGroups} />
      </View>
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
