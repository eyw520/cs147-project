import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React from "react";

import FriendsList from "../../components/FriendsList";

// provided in route a list of events, display to take up entire screen.
export default function FriendsDisplayScreen({ route }) {
  const { friends } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text> Your Friends </Text>
      {friends.length === 0 ?
        <Text> Find Friends w/ your interests through the social tab! </Text>
        :
        <FriendsList friends={friends} />
      }
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
