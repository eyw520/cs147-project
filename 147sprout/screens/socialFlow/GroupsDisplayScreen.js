import { StyleSheet, Pressable, Text, View, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";

import GroupList from "../../components/GroupList";

// provided in route a list of groups, display to take up entire screen.
export default function GroupsDisplayScreen({ navigation, route }) {
  const { groupList, title } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text> {title} </Text>
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
