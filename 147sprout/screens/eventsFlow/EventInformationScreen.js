import { StyleSheet, Text, TextInput, View, SafeAreaView, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Colors, Layout, Typography } from "../../styles";
import * as Images from "../../assets/images/";

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
      <SafeAreaView style={styles.topContainer}>
        <View style={styles.container}>
          <Image style={[styles.headerImage, styles.bottomMargin]} source={Images.events[eventData.id]}/>
          <Text style={styles.header}>{eventData.eventName}</Text>
          <Text style={styles.small}>{eventData.eventStart} - {eventData.eventEnd}</Text>
          <Text style={styles.subheader}>{eventData.eventAddress}</Text>
          <Text style={[styles.body, styles.bottomMargin]}>{eventData.eventDescription}</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.subheader}>Who else is attending:</Text>
          {attendeeData.map((attendee, idx) => {
            return <View key={idx} style={styles.attendee}>
              <Image style={styles.attendeeImage} source={Images.profiles[attendee.img]}/>
              <Text style={styles.body}>{attendee.name}</Text>
            </View>
          })}
        </View>

        {eventData.host === USER.id && eventData.status === "live" && eventData.message !== "" &&
          <View>
            <Text>Your Event was approved with the following message</Text>
            <Text>{eventData.message}</Text>
            <Pressable onPress={() => clearMessage()}>
              <Text> Clear Message </Text>
            </Pressable>
          </View>
        }

        {eventData.host === USER.id && eventData.status === "rejected" && eventData.message !== "" &&
          <View>
            <Text>Your Event was rejected with the following message</Text>
            <Text>{eventData.message}</Text>
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
              <Text>Cancel RSVP</Text>
            </Pressable>
          }
          {!attendees.includes(USER.id) && eventData.status === "live" &&
            <Pressable onPress={() => {navigation.navigate("Register", {
              eventData: eventData,
            })}}>
              <Text style={styles.subheader}>RSVP</Text>
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
  topContainer: {
    ...Layout.topContainer,
  },
  container: {
    ...Layout.container,
  },
  attendee: {
    ...Layout.container,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5
  },
  headerImage: {
    ...Layout.image,
    width: "100%",
    height: 220,
    borderRadius: 20
  },
  attendeeImage: {
    ...Layout.image,
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10
  },
  body: {
    ...Typography.body
  },
  header: {
    ...Typography.header,
    marginBottom: 5
  },
  subheader: {
    ...Typography.subheader,
  },
  small: {
    ...Typography.small,
    fontSize: 10,
    lineHeight: 12,
  },
  bottomMargin: {
    marginBottom: 10
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
