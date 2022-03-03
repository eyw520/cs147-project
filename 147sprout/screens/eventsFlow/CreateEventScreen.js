import { StyleSheet, Button, Text, TextInput, View, SafeAreaView, Pressable } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MultiSelect } from 'react-native-element-dropdown';
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

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
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 20}}>CREATE NEW EVENT</Text>

      <MultiSelect
        style = {styles.dropdown}
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

      <TextInput
        style={styles.textInput}
        value={eventTitle}
        placeholder="event title"
        onChangeText={(newText) => setEventTitle(newText)}
      />

      <TextInput
        style={styles.textInput}
        value={eventDescription}
        placeholder="event description"
        onChangeText={(newText) => setEventDescription(newText)}
      />

      <TextInput
        style={styles.textInput}
        value={eventAddress}
        placeholder="event address"
        onChangeText={(newText) => setEventAddress(newText)}
      />

      <MultiSelect
        style = {styles.dropdown}
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

      <MultiSelect
        style = {styles.dropdown}
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

      <Button title="select start datetime" onPress={() => setOpenStart(true)} />
      <Text> {eventStart.toString()} </Text>
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

      <Button title="select end datetime" onPress={() => setOpenEnd(true)} />
      <Text> {eventEnd.toString()} </Text>
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

      {confirm ?
        <Text style={{fontSize: 20}}>
          Confirmed
        </Text>
        :
        <Pressable onPress={() => setConfirm(true)}>
          <Text style={{fontSize: 20}}>
            I assert the inputted details are correct.
          </Text>
        </Pressable>
      }

      {enableSubmit ?
        <Pressable onPress={() => submitEvent()}>
          <Text style={{fontSize: 20, backgroundColor: '#ddd'}}>
            Submit
          </Text>
        </Pressable>
        :
        <Text style={{fontSize: 20}}>
          Fill out to Submit
        </Text>
      }

      <Modal
        style={{ alignItems: "center" }}
        isVisible={modalVisible}
      >
        <View style={{ alignItems: "center", height: 100, width: 300, backgroundColor: "white" }}>

          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Your event will be reviewed.
          </Text>
          <Pressable onPress={() => (
            setModalVisible(false),
            navigation.navigate("Manage Events")
          )}>
            <Text>
              Click here to return to your events.
            </Text>
          </Pressable>

        </View>
      </Modal>

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
  dropdown: {
    width: '80%',
    backgroundColor: '#ddd',
    borderStyle: "solid",
    borderWidth:  1
  }
});
