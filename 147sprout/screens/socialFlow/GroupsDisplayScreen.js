import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import { Colors, Layout, Typography } from "../../styles";

import GroupList from "../../components/GroupList";

// provided in route a list of groups, display to take up entire screen.
export default function GroupsDisplayScreen({ route }) {
  const { groupList, title } = route.params;

  return (
    <SafeAreaView style={styles.topContainer}>
      <GroupList groups={groupList} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
  },
});
