import { StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Colors, Layout, Typography } from "../../styles";

import GroupDisplayList from "../../components/GroupDisplayList";

// provided in route a list of groups, display to take up entire screen.
export default function GroupsDisplayScreen({ route }) {
  const { groups } = route.params;
  const [groupList, setGroupList] = useState([])

  const getGroupList = async () => {
    const querySnapshot = await getDocs(collection(db, "groups"));
    let ls = []
    querySnapshot.forEach((doc) => { ls = [...ls, doc.data()] });
    setGroupList(ls.filter(item => groups.includes(item.id)))
  };

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <SafeAreaView style={styles.topContainer}>
      <GroupDisplayList groups={groupList} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
  },
});
