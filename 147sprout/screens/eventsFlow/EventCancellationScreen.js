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
    navigation.navigate("Events")
  }

  return (
    <SafeAreaView style={styles.container}>

    <Text style={{fontSize: 20}}>
      Are you sure you'd like to cancel your attendance?
    </Text>
    <Text>
      Depending on event permissions, you may RSVP again.
    </Text>

    {confirm ?
      <View>
        <Text style={{fontSize: 20}}>
          Cancellation confirmed
        </Text>
        <Pressable onPress={() => updateAttendance()}>
          <Text style={{fontSize: 20}}>
            Cancel
          </Text>
        </Pressable>
      </View>
      :
      <View>
        <Pressable onPress={() => setConfirm(true)}>
          <Text style={{fontSize: 20}}>
            Confirm cancellation
          </Text>
        </Pressable>
        <Text style={{fontSize: 20}}>
          Cancel
        </Text>
      </View>
    }

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
