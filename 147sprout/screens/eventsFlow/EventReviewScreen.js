import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Colors, Layout, Typography } from "../../styles";

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
    <SafeAreaView style={styles.topContainer}>
      {eventsForUserReview.length > 0 ?
        <View style={styles.container}>
          <Text style={styles.subheader}>Events For Your Review</Text>
          <EventList events={eventsForUserReview} />
        </View>
        :
        <Text style={styles.subheader}>No Events For Review</Text>
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
    flex: 1,
    marginBottom: 10
  },
  subheader: {
    ...Typography.subheader,
  },
});
