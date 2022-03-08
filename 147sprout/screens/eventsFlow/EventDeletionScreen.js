import { StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Colors, Layout, Typography } from "../../styles";

export default function EventDeletionScreen({ route, navigation }) {
  const [confirm, setConfirm] = useState(false);
  const { eventData } = route.params;

  const cancelEvent = async () => {
    const eventRef = doc(db, "events", eventData.id);
    await updateDoc(eventRef, {
      status: "cancelled"
    });
    const eventSnap = await getDoc(eventRef);
    navigation.navigate("Events")
  }

  return (
    <SafeAreaView style={styles.topContainer}>

      <Text style={[styles.subheader, styles.bottomMargin]}>Are you sure you'd like to cancel your event?</Text>
      <Text style={[styles.body, styles.bottomMargin]}>You can undo this actiom from your "Manage Events" page.</Text>

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
              cancelEvent();
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
