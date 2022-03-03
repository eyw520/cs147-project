import { StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import GroupDisplayList from "../../components/GroupDisplayList";

// provided in route a list of groups, display to take up entire screen.
export default function GroupsDisplayScreen({ route }) {
  const { userGroups } = route.params;
  const [groupList, setGroupList] = useState([])

  const getGroupList = async () => {
    const querySnapshot = await getDocs(collection(db, "groups"));
    let ls = []
    querySnapshot.forEach((doc) => { ls = [...ls, doc.data()] });
    setGroupList(ls.filter(item => userGroups.includes(item.id)))
  };

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GroupDisplayList groups={groupList} />
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
