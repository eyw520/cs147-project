import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function FindEventsScreen({ navigation }) {
  // [userEvents, setUserEvents] = useState([])

  // retrieve user events

  return (
    <SafeAreaView style={styles.container}>
      <Text>FIND EVENTS SCREEN</Text>
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
