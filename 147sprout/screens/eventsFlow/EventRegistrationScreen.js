import { StyleSheet, Text, TextInput, Pressable, SafeAreaView, View } from 'react-native';
import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Colors, Layout, Typography } from "../../styles";
import { FontAwesome5 } from '@expo/vector-icons';

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
    navigation.navigate("Events");
  }

  useEffect(() => {
    checkEnableSubmit();
  }, [request, otherDetails, confirm]);

  return (
    <SafeAreaView style={styles.topContainer}>
    <Text style={styles.subheader}> Fill out to confirm your registration: </Text>

    <Text style={styles.small}>what interests you about the event?</Text>
    <TextInput
      style={[styles.field, styles.body, styles.input]}
      value={request}
      placeholder="let us know why you're interested!"
      onChangeText={(newText) => setRequest(newText) }
    />

    <Text style={styles.small}>any other details you'd like to provide?</Text>
    <TextInput
      style={[styles.field, styles.body, styles.input]}
      value={otherDetails}
      placeholder="additional info..."
      onChangeText={(newText) => setOtherDetails(newText) }
    />

    <View style={styles.submit}>
      {confirm ?
        <View style={styles.complete}>
          <Text style={styles.bodyGreen}>
            Confirmed  <FontAwesome5 name="check" size={12} color={Colors.green} />
          </Text>
        </View>
        :
        <Pressable style={styles.button} onPress={() => setConfirm(true)}>
          <Text style={styles.body}>Confirm attendance</Text>
        </Pressable>
      }
    </View>

    <View style={styles.submit}>
      {enableSubmit ?
        <Pressable style={styles.button} onPress={() => updateAttendance()}>
          <Text style={styles.body}>Submit</Text>
        </Pressable>
        :
        <View style={styles.buttonGray}>
          <Text style={styles.bodyGray}>Fill All Fields to Submit</Text>
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
  button: {
    ...Layout.button,
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
  subheader: {
    ...Typography.subheader,
    marginBottom: 10
  },
  body: {
    ...Typography.body
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
  field: {
    ...Layout.button,
    width: "100%",
    marginBottom: 10
  },
  input: {
    paddingVertical: 8
  },
  submit: {
    alignSelf: "flex-start",
    marginTop: 10
  },
});
