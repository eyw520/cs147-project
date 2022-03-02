import { StyleSheet, Pressable, Text, View, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import GroupList from "../../components/GroupList";

// provided in route a list of groups, display to take up entire screen.
export default function GroupsDisplayScreen({ navigation, route }) {
  const { userGroups } = route.params;
  const [groupList, setGroupList] = useState([])

  const getGroupList = async () => {
    const querySnapshot = await getDocs(collection(db, "groups"));
    console.log("read collection query performed.")
    let ls = []
    querySnapshot.forEach((doc) => { ls = [...ls, doc.data()] });
    setGroupList(ls.filter(item => userGroups.includes(item.id)))
    console.log(groupList)
  };

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GroupList groups={groupList} />
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
