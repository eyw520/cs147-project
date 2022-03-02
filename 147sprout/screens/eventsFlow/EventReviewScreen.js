import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import EventList from "../../components/EventList";

import USER from "../../consts/user";

export default function EventReviewScreen({ navigation }) {
  const [eventsForUserReview, setEventsForUserReview] = useState([])

  const getEventsForUserReview = async () => {
    let ls = []
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("reviewers", "array-contains", USER.id));
    const queryResults = await getDocs(q);
    queryResults.forEach((doc) => { ls = [...ls, doc.data()] });
    console.log("read collection query performed.")
    setEventsForUserReview(ls.filter(item => item.status === "pending"))
  };

  useEffect(() => {
    navigation.addListener(
          'focus',
          payload => {
              getEventsForUserReview();
          }
      );
    }, [])

  return (
    <SafeAreaView style={styles.container}>
      {eventsForUserReview.length > 0 ?
        <View style={styles.container}>
          <Text style={{fontSize: 20}}> Events For Your Review </Text>
          <EventList events={eventsForUserReview} />
        </View>
        :
        <Text style={{fontSize: 20}}> No Events For Review </Text>
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
  }
});
