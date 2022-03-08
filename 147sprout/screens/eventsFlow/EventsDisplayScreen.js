import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React from "react";

import { Colors, Layout, Typography } from "../../styles";
import EventList from "../../components/EventList";

// provided in route a list of events, display to take up entire screen.
export default function EventsDisplayScreen({ route }) {
  const { eventList, title } = route.params;

  return (
    <SafeAreaView style={styles.topContainer}>
      <Text style={styles.header}>{title}</Text>
      <EventList events={eventList} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
  },
  container: {
    ...Layout.container,
  },
  header: {
    ...Typography.header,
    marginBottom: 10
  }
});
