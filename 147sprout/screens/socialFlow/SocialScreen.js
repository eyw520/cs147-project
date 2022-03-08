import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Colors, Layout, Typography } from "../../styles";

import GroupList from "../../components/GroupList";

import USER from "../../consts/user";

export default function SocialScreen({ navigation }) {
  const [allGroups, setAllGroups] = useState([])
  const [userMemberGroups, setUserMemberGroups] = useState([])
  const [userDiscoverGroups, setUserDiscoverGroups] = useState([])

  const getAllGroups = async () => {
    const querySnapshot = await getDocs(collection(db, "groups"));
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
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.container}>
        <View style={styles.hContainer}>
          <Text style={styles.subheader}>Discover Groups</Text>
          <Pressable onPress={() => {navigation.navigate("Discover Groups", {
              groupList: userDiscoverGroups,
              title: "Discover Groups"
            })}}>
            <Text style={styles.small}>View All</Text>
          </Pressable>
        </View>
        <GroupList groups={userDiscoverGroups} />
      </View>

      <View style={styles.container}>
        <View style={styles.hContainer}>
          <Text style={styles.subheader}>Your Groups</Text>
          <Pressable onPress={() => {navigation.navigate("Your Groups", {
              groupList: userMemberGroups,
              title: "Your Groups"
            })}}>
            <Text style={styles.small}>View All</Text>
          </Pressable>
        </View>
        <GroupList groups={userMemberGroups} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
  },
  container: {
    ...Layout.container,
    flex: 1,
    overflow: "hidden"
  },
  hContainer: {
    ...Layout.container,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between"
  },
  subheader: {
    ...Typography.subheader,
  },
  body: {
    ...Typography.body,
  },
  small: {
    ...Typography.small,
    fontSize: 11,
    lineHeight: 11,
    color: Colors.gray,
  },
});
