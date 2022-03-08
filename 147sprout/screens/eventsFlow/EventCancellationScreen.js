import { StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Colors, Layout, Typography } from "../../styles";

import USER from "../../consts/user";

export default function EventRegistrationScreen({ route, navigation }) {
  const [confirm, setConfirm] = useState(false);
  const { eventData } = route.params;

  const updateAttendance = async () => {
    const eventRef = doc(db, "events", eventData.id);
    var index = eventData.attendees.indexOf(USER.id);
    if (index > -1) {
      eventData.attendees.splice(index, 1);
    }
    await updateDoc(eventRef, {
      attendees: eventData.attendees
    });
    const eventSnap = await getDoc(eventRef);
    navigation.navigate("Events");
  }

  return (
    <SafeAreaView style={styles.topContainer}>

      <Text style={[styles.subheader, styles.bottomMargin]}>Are you sure you'd like to cancel your attendance?</Text>
      <Text style={[styles.body, styles.bottomMargin]}>Depending on event permissions, you may RSVP again.</Text>

      {confirm ?
        <View style={styles.buttonGray}>
          <Text style={styles.bodyGray}>Cancellation confirmed</Text>
        </View>
        :
        <View>
        <Pressable
          style={styles.button}
          onPress={() => {
            setConfirm(true);
            updateAttendance();
          }}
        >
            <Text style={styles.body}>Confirm cancellation</Text>
          </Pressable>
        </View>
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
  button: {
    ...Layout.button,
  },
  buttonGray: {
    ...Layout.button,
    borderColor: Colors.lightGray,
    borderRadius: 20,
  },
  subheader: {
    ...Typography.subheader,
    lineHeight: 20,
  },
  body: {
    ...Typography.body,
  },
  bodyGray: {
    ...Typography.body,
    color: Colors.lightGray
  },
  bottomMargin: {
    marginBottom: 10
  }
});
