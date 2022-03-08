import { StyleSheet, field, Text, TextInput, View, SafeAreaView, Pressable, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MultiSelect } from 'react-native-element-dropdown';
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Layout, Typography } from "../../styles";

import INTERESTS from "../../consts/interests";
import LOCATIONS from "../../consts/locations";
import REVIEWERS from "../../consts/reviewers";
import USER from "../../consts/user";

export default function CreateEventScreen({ navigation }) {
  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventAddress, setEventAddress] = useState("")

  const [openStart, setOpenStart] = useState(false)
  const [openEnd, setOpenEnd] = useState(false)
  const [eventStart, setEventStart] = useState(new Date(Date.now()))
  const [eventEnd, setEventEnd] = useState(new Date(Date.now()))

  const [eventReviewers, setEventReviewers] = useState([])
  const [eventLocations, setEventLocations] = useState([])
  const [eventInterests, setEventInterests] = useState([])

  const [confirm, setConfirm] = useState(false)
  const [enableSubmit, setEnableSubmit] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const checkEnableSubmit = () => {
    if (eventStart !== new Date(Date.now()) &&
      eventEnd !== new Date(Date.now()) &&
      eventEnd > eventStart &&
      eventTitle !== "" &&
      eventDescription !== "" &&
      eventAddress !== "" &&
      eventReviewers !== [] &&
      eventLocations !== [] &&
      eventInterests !== [] &&
      confirm
    ) {
      setEnableSubmit(true)
    } else {
      setEnableSubmit(false)
    }
  }

  const submitEvent = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    let currId = `event${querySnapshot.size + 1}`
    await setDoc(doc(db, "events", currId), {
      eventName: eventTitle,
      eventDescription: eventDescription,
      eventAddress: eventAddress,
      attendees: [USER.id],
      host: USER.id,
      interests: eventInterests,
      locations: eventLocations,
      eventStart: eventStart.toString(),
      eventEnd: eventEnd.toString(),
      reviewers: eventReviewers,
      approvers: [],
      status: "pending",
      id: currId
    });
    setModalVisible(true)
  }

  useEffect(() => {
    checkEnableSubmit();
  }, [eventTitle,
    eventDescription,
    eventAddress,
    eventStart,
    eventEnd,
    eventReviewers,
    eventLocations,
    eventInterests,
    confirm
  ]);

  return (
    <SafeAreaView style={styles.topContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Create New Event</Text>

        <Text style={styles.small}>Assign Reviewers</Text>
        <MultiSelect
          style={[styles.field, styles.sort]}
          selectedStyle={styles.selected}
          placeholderStyle={styles.body}
          selectedTextStyle={styles.body}
          search
          data={REVIEWERS}
          labelField="username"
          valueField="id"
          placeholder="Assign reviewer(s)"
          searchPlaceholder="Search reviewer..."
          value={eventReviewers}
          onChange={item => {
            setEventReviewers(item)
          }}
        />

        <Text style={styles.small}>Event Title</Text>
        <TextInput
          style={[styles.field, styles.body, styles.input]}
          value={eventTitle}
          placeholder="event title"
          onChangeText={(newText) => setEventTitle(newText)}
        />

        <Text style={styles.small}>Event Description</Text>
        <TextInput
          style={[styles.field, styles.body, styles.input]}
          value={eventDescription}
          placeholder="event description"
          onChangeText={(newText) => setEventDescription(newText)}
        />

        <Text style={styles.small}>Event Address</Text>
        <TextInput
          style={[styles.field, styles.body, styles.input]}
          value={eventAddress}
          placeholder="event address"
          onChangeText={(newText) => setEventAddress(newText)}
        />

        <Text style={styles.small}>Select Interests</Text>
        <MultiSelect
          style={[styles.field, styles.sort]}
          selectedStyle={styles.selected}
          placeholderStyle={styles.body}
          selectedTextStyle={styles.body}
          search
          data={INTERESTS}
          labelField="val"
          valueField="val"
          placeholder="Select interest(s)"
          searchPlaceholder="Search interests..."
          value={eventInterests}
          onChange={item => {
            setEventInterests(item);
          }}
        />

        <Text style={styles.small}>Select Locations</Text>
        <MultiSelect
          style={[styles.field, styles.sort]}
          selectedStyle={styles.selected}
          placeholderStyle={styles.body}
          selectedTextStyle={styles.body}
          search
          data={LOCATIONS}
          labelField="val"
          valueField="val"
          placeholder="Select location(s)"
          searchPlaceholder="Search location..."
          value={eventLocations}
          onChange={item => {
            setEventLocations(item);
          }}
        />

        <Text style={styles.small}>Start Time</Text>
        <Pressable style={[styles.field, styles.input]} onPress={() => setOpenStart(true)}>
          <Text style={styles.body}>{eventStart.toDateString()}, {eventStart.toLocaleTimeString()}</Text>
          <DateTimePickerModal
            isVisible={openStart}
            mode="datetime"
            display="inline"
            minimumDate={new Date(Date.now())}
            onConfirm={(date) => {
              setEventStart(date)
              setOpenStart(false)
            }}
            onCancel={() => setOpenStart(false)}
          />
        </Pressable>

        <Text style={styles.small}>End Time</Text>
        <Pressable style={[styles.field, styles.input]} onPress={() => setOpenEnd(true)}>
          <Text style={styles.body}>{eventEnd.toDateString()}, {eventEnd.toLocaleTimeString()}</Text>
          <DateTimePickerModal
            isVisible={openEnd}
            mode="datetime"
            display="inline"
            minimumDate = {eventStart}
            onConfirm={(date) => {
              setEventEnd(date)
              setOpenEnd(false)
            }}
            onCancel={() => setOpenEnd(false)}
          />
        </Pressable>

        <View style={styles.submit}>
          {confirm ?
            <View style={styles.complete}>
              <Text style={styles.bodyGreen}>
                Confirmed  <FontAwesome5 name="check" size={12} color={Colors.green} />
              </Text>
            </View>
            :
            <Pressable style={styles.button} onPress={() => setConfirm(true)}>
              <Text style={styles.body}>I assert the inputted details are correct</Text>
            </Pressable>
          }
        </View>

        <View style={styles.submit}>
          {enableSubmit ?
            <Pressable style={styles.button} onPress={() => submitEvent()}>
              <Text style={styles.body}>Submit</Text>
            </Pressable>
            :
            <View style={styles.buttonGray}>
              <Text style={styles.bodyGray}>Fill All Fields to Submit</Text>
            </View>
          }
        </View>

        <Modal isVisible={modalVisible}>
          <View style={styles.modal}>

            <Text style={[styles.body, {marginBottom: 20}]}>Your event will be reviewed.</Text>
            <Pressable
              style={styles.button}
              onPress={() => (
                setModalVisible(false),
                navigation.navigate("Manage Events")
              )}
            >
              <Text style={styles.body}>Return to Events</Text>
            </Pressable>

          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
  },
  modal: {
    ...Layout.modal,
    paddingVertical: 30,
    alignItems: "center"
  },
  hContainer: {
    ...Layout.container,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  tagsContainer: {
    ...Layout.container,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sort: {
    paddingVertical: 0,
  },
  sortText: {
    ...Typography.body,
    color: Colors.gray,
    fontSize: 12,
    lineHeight: 18
  },
  button: {
    ...Layout.button
  },
  buttonGray: {
    ...Layout.button,
    borderColor: Colors.lightGray,
    borderRadius: 20,
  },
  complete: {
    ...Layout.button,
    borderColor: Colors.green,
    borderRadius: 20,
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  field: {
    ...Layout.button,
    width: "100%",
    marginBottom: 10
  },
  input: {
    paddingVertical: 8
  },
  selected: {
    marginTop: 0,
    marginBottom: 10
  },
  submit: {
    alignSelf: "flex-start",
    marginTop: 10
  },
  header: {
    ...Typography.header,
    marginBottom: 10
  },
  subheader: {
    ...Typography.subheader,
  },
  body: {
    ...Typography.body,
  },
  bodyGray: {
    ...Typography.body,
    color: Colors.lightGray
  },
  bodyGreen: {
    ...Typography.body,
    color: Colors.green
  },
  small: {
    ...Typography.small,
    fontSize: 10,
    lineHeight: 10,
    marginLeft: 15,
    marginBottom: 4
  },
});
