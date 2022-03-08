import { StyleSheet, Text, TextInput, View, SafeAreaView, ScrollView, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FontAwesome5 } from '@expo/vector-icons';
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
        <ScrollView style={styles.scroll}>
          <Image style={[styles.headerImage, styles.bottomMargin]} source={Images.events[eventData.id]}/>
          <Text style={styles.header}>{eventData.eventName}</Text>
          <Text style={styles.small}>{eventData.eventStart} - {eventData.eventEnd}</Text>
          <Text style={styles.subheader}>{eventData.eventAddress}</Text>
          <Text style={[styles.body, styles.bottomMargin]}>{eventData.eventDescription}</Text>

          {eventData.host === USER.id && eventData.status === "live" && eventData.message !== "" &&
            <View>
              <View style={styles.buttonGreen}>
                <Text style={styles.bodyGreen}>Approved  <FontAwesome5 name="check" size={12} color={Colors.green} /></Text>
              </View>
              <View style={styles.message}>
                <Text style={styles.body}>{eventData.message}</Text>
                <Pressable style={styles.button} onPress={() => clearMessage()}>
                  <Text style={styles.body}>Clear Message</Text>
                </Pressable>
              </View>
            </View>
          }

          {eventData.host === USER.id && eventData.status === "rejected" && eventData.message !== "" &&
            <View>
              <View style={styles.buttonPurple}>
                <Text style={styles.bodyPurple}>Not Approved  <FontAwesome5 name="times" size={12} color={Colors.purple} /></Text>
              </View>
              <View style={styles.message}>
                <Text style={styles.body}>{eventData.message}</Text>
                <Pressable style={styles.button} onPress={() => clearMessage()}>
                  <Text style={styles.body}>Clear Message</Text>
                </Pressable>
              </View>
            </View>
          }

          <Text style={styles.subheader}>Who else is attending:</Text>
          {attendeeData.map((attendee, idx) => { return (
            <View key={idx} style={styles.attendee}>
              <Image style={styles.attendeeImage} source={Images.profiles[attendee.img]}/>
              <Text style={styles.body}>{attendee.name}</Text>
            </View>
          )})}

        </ScrollView>

        <View style={styles.container}>
          {attendees.includes(USER.id) && eventData.status === "live" && eventData.host !== USER.id &&
            <Pressable style={styles.button} onPress={() => {navigation.navigate("Cancel", {
              eventData: eventData,
            })}}>
              <Text style={styles.body}>Cancel RSVP</Text>
            </Pressable>
          }
          {!attendees.includes(USER.id) && eventData.status === "live" &&
            <Pressable style={styles.button} onPress={() => {navigation.navigate("Register", {
              eventData: eventData,
            })}}>
              <Text style={styles.body}>RSVP</Text>
            </Pressable>
          }
          {eventData.host === USER.id && eventData.status === "live" &&
            <Pressable style={styles.button} onPress={() => {navigation.navigate("Delete Event", {
              eventData: eventData,
            })}}>
              <Text style={styles.body}>Cancel Event</Text>
            </Pressable>
          }
          {eventData.host === USER.id && eventData.status === "rejected" &&
            <Pressable style={styles.button} onPress={() => deleteEvent()}>
              <Text style={styles.body}>Delete Event</Text>
            </Pressable>
          }
          {eventData.host === USER.id && eventData.status === "cancelled" &&
            <Pressable style={styles.button} onPress={() => {navigation.navigate("Restore Event", {
              eventData: eventData,
            })}}>
              <Text style={styles.body}>Restore Event</Text>
            </Pressable>
          }
          {eventData.reviewers.includes(USER.id) && eventData.status === "pending" &&
            <View>
              <View style={styles.hContainer}>
                <Pressable style={[styles.buttonGreen, styles.hFlex, {marginRight: 10}]} onPress={() => approveEvent()}>
                  <Text style={styles.bodyGreen}>Approve Event  <FontAwesome5 name="check" size={12} color={Colors.green} /></Text>
                </Pressable>
                <Pressable style={[styles.buttonPurple, styles.hFlex]} onPress={() => rejectEvent()}>
                  <Text style={styles.bodyPurple}>Reject Event  <FontAwesome5 name="times" size={12} color={Colors.purple} /></Text>
                </Pressable>
              </View>
              <TextInput
                style={[styles.field, styles.body, styles.input]}
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
  hContainer: {
    ...Layout.container,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10
  },
  message: {
    backgroundColor: Colors.offWhite,
    borderRadius: 30,
    padding: 20,
    marginVertical: 10
  },
  hFlex: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scroll: {
    flex: 1
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
  bodyGreen: {
    ...Typography.body,
    color: Colors.green
  },
  bodyPurple: {
    ...Typography.body,
    color: Colors.purple
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
  button: {
    ...Layout.button,
    marginTop: 10
  },
  buttonGreen: {
    ...Layout.button,
    borderColor: Colors.green,
    borderRadius: 20,
    flexDirection: "row",
    flexWrap: "nowrap",
    marginTop: 10
  },
  buttonPurple: {
    ...Layout.button,
    borderColor: Colors.purple,
    borderRadius: 20,
    flexDirection: "row",
    flexWrap: "nowrap",
    marginTop: 10
  },
  field: {
    ...Layout.button,
    width: "100%",
  },
  input: {
    paddingVertical: 8
  },
});
