import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React from "react";

import { Colors, Layout, Typography } from "../../styles";
import EventList from "../../components/EventList";

// provided in route a list of events, display to take up entire screen.
export default function EventsDisplayScreen({ route }) {
  const { eventList, title } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text> {title} </Text>
      <EventList events={eventList} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Layout.container,
    backgroundColor: Colors.white
  },
});
