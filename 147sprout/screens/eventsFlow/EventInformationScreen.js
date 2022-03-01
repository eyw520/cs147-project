import { StyleSheet, Button, Text, View, SafeAreaView, Pressable } from 'react-native';
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import User from "../../consts/user";

export default function EventInformationScreen({ route, navigation }) {
  const [attendees, setAttendees] = useState([])
  const [attendeeData, setAttendeeData] = useState([])
  const { eventData } = route.params;

  const getAttendees = async () => {
    let ls1 = []
    let ls2 = []
    await eventData.attendees.forEach(async (item) => {
      const docRef = doc(db, "users", item);
      const docSnap = await getDoc(docRef);
      console.log("read query performed.");
      if (docSnap.exists()) {
        obj = {
          id: docSnap.data().id,
          img: docSnap.data().img,
          name: docSnap.data().name
        }
        ls1 = [...ls1, docSnap.data().id]
        ls2 = [...ls2, obj]
        setAttendees(ls1)
        setAttendeeData(ls2)
      } else {
        console.log("user not found");
      }
    });
  };

  useEffect(() => {
    getAttendees();
  }, []);

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text> {eventData.eventName} </Text>
          <Text> {eventData.eventStart}, {eventData.eventEnd} </Text>
          <Text> {eventData.eventAddress} </Text>
          <Text> {eventData.eventDescription} </Text>
        </View>

        <View style={styles.container}>
          <Text> Who else is attending: </Text>
          {attendeeData.map((attendee, idx) => {
            return <View key = {idx}>
              <Text> {attendee.name} </Text>
              <Text> {attendee.img} </Text>
            </View>
          })}
        </View>

        <View style={styles.container}>
          {attendees.includes(User.id) ?
            <Text> RSVP'd </Text>
            :
            <Pressable onPress={() => {navigation.navigate("Register", {
              eventData: eventData,
            })}}>
              <Text> RSVP </Text>
            </Pressable>
          }
        </View>

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
  },
});
