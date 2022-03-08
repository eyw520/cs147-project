import { StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Colors, Layout, Typography } from "../../styles";

export default function EventRestoreScreen({ route, navigation }) {
  const [confirm, setConfirm] = useState(false);
  const { eventData } = route.params;

  const restoreEvent = async () => {
    const eventRef = doc(db, "events", eventData.id);
    await updateDoc(eventRef, {
      status: "live"
    });
    const eventSnap = await getDoc(eventRef);
    navigation.navigate("Events")
  }

  return (
    <SafeAreaView style={styles.topContainer}>

    <Text style={{fontSize: 20}}>
      Would you like to restore your event?
    </Text>

    {confirm ?
      <View>
        <Text style={{fontSize: 20}}>
          Restore confirmed
        </Text>
        <Pressable onPress={() => restoreEvent()}>
          <Text style={{fontSize: 20}}>
            Restore
          </Text>
        </Pressable>
      </View>
      :
      <View>
        <Pressable onPress={() => setConfirm(true)}>
          <Text style={{fontSize: 20}}>
            Confirm restore
          </Text>
        </Pressable>
        <Text style={{fontSize: 20}}>
          Restore
        </Text>
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
  textInput: {
    width: '80%',
    height: 30,
    padding: 8,
    margin: 2,
    backgroundColor: '#ddd',
  }
});
