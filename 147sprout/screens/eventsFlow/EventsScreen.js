import { StyleSheet, Pressable, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

import { Colors, Layout, Typography } from "../../styles";
import EventList from "../../components/EventList";

import USER from "../../consts/user";

export default function EventsScreen({ navigation }) {
  const [allEvents, setAllEvents] = useState([])
  const [userAttending, setUserAttending] = useState([])
  const [userHosting, setUserHosting] = useState([])

  const getAllEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    let ls = []
    querySnapshot.forEach((doc) => { ls = [...ls, doc.data()] });
    setAllEvents(ls)
  };

  const getUserEvents = () => {
    setUserAttending(allEvents.filter(item => item.host !== USER.id && item.attendees.includes(USER.id) && item.status === "live"))
    setUserHosting(allEvents.filter(item => item.host === USER.id && item.status === "live"))
  };

  useEffect(() => {
    navigation.addListener(
          'focus',
          payload => {
              getAllEvents();
          }
      );
    }, [])

  useEffect(() => {
    getUserEvents();
  }, [allEvents]);

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.container}>
        <Text style={styles.subheader}>Events You're Attending</Text>
        <EventList events={userAttending} />
      </View>

      <View style={styles.container}>
        <Text style={styles.subheader}>Events You're Hosting</Text>
        <EventList events={userHosting} />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Find Events", {
              allEvents: allEvents,
              userAttending: userAttending,
              userHosting: userHosting,
            })}
        >
          <Text style={styles.body}>Find Events</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer
  },
  container: {
    ...Layout.container,
    flex: 1,
    overflow: "hidden",
    paddingBottom: 10,
    marginBottom: 10
  },
  buttonContainer: {
    ...Layout.container,
    marginTop: 15
  },
  button: {
    ...Layout.button
  },
  subheader: {
    ...Typography.subheader
  },
  body: {
    ...Typography.body
  }
});
