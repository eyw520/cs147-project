import { StyleSheet, Button, Text, TextInput, View, SafeAreaView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function CreateEventScreen({ navigation }) {
  const [eventTitle, setEventTitle] = useState("")
  const [eventDescription, setEventDescription] = useState("")

  const [openStart, setOpenStart] = useState(false)
  const [eventStart, setEventStart] = useState(new Date(Date.now()))
  const [openEnd, setOpenEnd] = useState(false)
  const [eventEnd, setEventEnd] = useState(new Date(Date.now()))

  const [eventLocation, setEventLocation] = useState([])
  const [eventInterests, setEventInterests] = useState([])
  const [eventPhoto, setEventPhoto] = useState("")

  return (
    <SafeAreaView style={styles.container}>
      <Text>CREATE EVENT SCREEN</Text>

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

      <Button title="select start" onPress={() => setOpenStart(true)} />
      <DateTimePickerModal
        isVisible={openStart}
        mode="date"
        display="inline"
        minimumDate={new Date(Date.now())}
        onConfirm={(date) => {
          setEventStart(date)
          setOpenStart(false)
          console.log(date)
        }}
        onCancel={() => setOpenStart(false)}
      />

      <Button title="select end" onPress={() => setOpenEnd(true)} />
      <DateTimePickerModal
        isVisible={openEnd}
        mode="date"
        display="inline"
        minimumDate = {eventStart}
        onConfirm={(date) => {
          setEventEnd(date)
          setOpenEnd(false)
          console.log(date)
        }}
        onCancel={() => setOpenEnd(false)}
      />


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
  }
});
