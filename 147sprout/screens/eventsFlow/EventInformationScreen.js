import { StyleSheet, Text, TextInput, View, SafeAreaView, Pressable } from 'react-native';
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import USER from "../../consts/user";

export default function EventInformationScreen({ route, navigation }) {
  const [attendees, setAttendees] = useState([])
  const [attendeeData, setAttendeeData] = useState([])
  const [message, setMessage] = useState("")
  const { eventData } = route.params;

  const getAttendees = async () => {
    let ls1 = []
    let ls2 = []
    await eventData.attendees.forEach(async (item) => {
      const docRef = doc(db, "users", item);
      const docSnap = await getDoc(docRef);
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
      }
    });
  };

  const approveEvent = async () => {
    const eventRef = doc(db, "events", eventData.id);
    if (eventData.approvers.length == eventData.reviewers.length - 1) {
      await updateDoc(eventRef, {
        approvers: [...eventData.approvers, USER.id],
        status: "live",
        message: message
      });
    } else {
      await updateDoc(eventRef, {
        approvers: [...eventData.approvers, USER.id]
      });
    }
    const eventSnap = await getDoc(eventRef);
    navigation.navigate("Manage Events")
  }

  const rejectEvent = async () => {
    const eventRef = doc(db, "events", eventData.id);
    await updateDoc(eventRef, {
      status: "rejected",
      message: message
    });
    navigation.navigate("Manage Events")
  }

  const deleteEvent = async () => {
    const eventRef = doc(db, "events", eventData.id);
    await updateDoc(eventRef, {
      status: "deleted",
      message: message
    });
    navigation.navigate("Manage Events")
  }

  const clearMessage = async () => {
    const eventRef = doc(db, "events", eventData.id);
    await updateDoc(eventRef, {
      message: ""
    });
    setMessage("")
  }

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

        {eventData.host === USER.id && eventData.status === "live" && eventData.message !== "" &&
          <View>
            <Text> Your Event was approved with the following message </Text>
            <Text> {eventData.message} </Text>
            <Pressable onPress={() => clearMessage()}>
              <Text> Clear Message </Text>
            </Pressable>
          </View>
        }

        {eventData.host === USER.id && eventData.status === "rejected" && eventData.message !== "" &&
          <View>
            <Text> Your Event was rejected with the following message </Text>
            <Text> {eventData.message} </Text>
            <Pressable onPress={() => clearMessage()}>
              <Text> Clear Message </Text>
            </Pressable>
          </View>
        }

        <View style={styles.container}>
          {attendees.includes(USER.id) && eventData.status === "live" && eventData.host !== USER.id &&
            <Pressable onPress={() => {navigation.navigate("Cancel", {
              eventData: eventData,
            })}}>
              <Text> Cancel RSVP </Text>
            </Pressable>
          }
          {!attendees.includes(USER.id) && eventData.status === "live" &&
            <Pressable onPress={() => {navigation.navigate("Register", {
              eventData: eventData,
            })}}>
              <Text> RSVP </Text>
            </Pressable>
          }
          {eventData.host === USER.id && eventData.status === "live" &&
            <Pressable onPress={() => {navigation.navigate("Delete Event", {
              eventData: eventData,
            })}}>
              <Text> Cancel Event </Text>
            </Pressable>
          }
          {eventData.host === USER.id && eventData.status === "rejected" &&
            <Pressable onPress={() => deleteEvent()}>
              <Text> Delete Event </Text>
            </Pressable>
          }
          {eventData.host === USER.id && eventData.status === "cancelled" &&
            <Pressable onPress={() => {navigation.navigate("Restore Event", {
              eventData: eventData,
            })}}>
              <Text> Restore Event </Text>
            </Pressable>
          }
          {eventData.reviewers.includes(USER.id) && eventData.status === "pending" &&
            <View>
              <Pressable onPress={() => approveEvent()}>
                <Text> Approve Event </Text>
              </Pressable>
              <Pressable onPress={() => rejectEvent()}>
                <Text> Reject Event </Text>
              </Pressable>
              <TextInput
                style={styles.textInput}
                value={message}
                placeholder="leave an optional message to the organizer"
                onChangeText={(newText) => setMessage(newText)}
              />
            </View>
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
  textInput: {
    width: '80%',
    height: 30,
    padding: 8,
    margin: 2,
    backgroundColor: '#ddd',
    borderStyle: "solid",
    borderWidth:  1
  },
});
