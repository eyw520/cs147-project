import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function CreateEventScreen({ navigation }) {
  const [eventTitle, setEventTitle] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const [eventStart, setEventStart] = useState("")
  const [eventEnd, setEventEnd] = useState("")
  
  const [eventInterests, setEventInterests] = useState([])
  const [eventDescription, setEventDescription] = useState("")
  const [eventPhoto, setEventPhoto] = useState("")

  return (
    <SafeAreaView style={styles.container}>
      <Text>CREATE EVENT SCREEN</Text>
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
  }
});
