import { StyleSheet, Text, TextInput, Pressable, SafeAreaView} from 'react-native';
import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Colors, Layout, Typography } from "../../styles";

import USER from "../../consts/user";

export default function EventRegistrationScreen({ route, navigation }) {
  const [request, setRequest] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const { eventData } = route.params;

  const checkEnableSubmit = () => {
    if (request !== "" && otherDetails !== "" && confirm === true) {
      setEnableSubmit(true)
    } else {
      setEnableSubmit(false)
    }
  }

  const updateAttendance = async () => {
    const eventRef = doc(db, "events", eventData.id);
    await updateDoc(eventRef, {
      attendees: [...eventData.attendees, USER.id]
    });
    navigation.navigate("Events")
  }

  useEffect(() => {
    checkEnableSubmit();
  }, [request, otherDetails, confirm]);

  return (
    <SafeAreaView style={styles.topContainer}>
    <Text style={{fontSize: 20}}> Fill out to confirm your registration: </Text>

    <TextInput
      style={styles.textInput}
      value={request}
      placeholder="let the organizers know why you're interested in the event!"
      onChangeText={(newText) => setRequest(newText) }
    />

    <TextInput
      style={styles.textInput}
      value={otherDetails}
      placeholder="are there any other details you'd like to provide?"
      onChangeText={(newText) => setOtherDetails(newText) }
    />

    {confirm ?
      <Text style={{fontSize: 20}}>
        Attendance confirmed
      </Text>
      :
      <Pressable onPress={() => setConfirm(true)}>
        <Text style={{fontSize: 20}}>
          Confirm attendance
        </Text>
      </Pressable>
    }

    {enableSubmit ?
      <Pressable onPress={() => updateAttendance()}>
        <Text style={{fontSize: 20}}>
          Submit
        </Text>
      </Pressable>
      :
      <Text style={{fontSize: 20}}>
        Fill out above fields to submit
      </Text>
    }

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
  textInput: {
    width: '80%',
    height: 30,
    padding: 8,
    margin: 2,
    backgroundColor: '#ddd',
  }
});
