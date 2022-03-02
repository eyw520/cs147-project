import { StyleSheet, Button, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

import EventList from "../../components/EventList";

import USER from "../../consts/user";

export default function EventsScreen({ navigation }) {
  const [allEvents, setAllEvents] = useState([])
  const [userAttending, setUserAttending] = useState([])
  const [userHosting, setUserHosting] = useState([])

  const getAllEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    console.log("read collection query performed.")
    let ls = []
    querySnapshot.forEach((doc) => { ls = [...ls, doc.data()] });
    setAllEvents(ls)
  };

  const getUserEvents = () => {
    setUserAttending(allEvents.filter(item => item.attendees.includes(USER.id) && item.status === "live"))
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
    <SafeAreaView style={styles.container}>

      <View style={styles.container}>
        <Text style={{fontSize: 20}}> Events You're Attending </Text>
        <EventList events={userAttending} />
      </View>

      <View style={styles.container}>
        <Text style={{fontSize: 20}}> Events You're Hosting </Text>
        <EventList events={userHosting} />
      </View>

      <View style={styles.button}>
        <Button
            title="Find Events"
            onPress={() => navigation.navigate("Find Events", {
              allEvents: allEvents,
              userAttending: userAttending,
              userHosting: userHosting,
            })}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  }
});
