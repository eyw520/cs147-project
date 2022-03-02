import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import ChatList from "../../components/ChatList";
import USER from "../../consts/user";

export default function MessagesScreen({ navigation }) {
  const [chatData, setChatData] = useState([])

  const getUserChatData = async () => {
    let ls = []
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("members", "array-contains", USER.id));
    const queryResults = await getDocs(q);
    queryResults.forEach((doc) => {
      ls = [...ls, doc.data()]
    })
    setChatData(ls)
  };

  useEffect(() => {
    navigation.addListener(
        'focus',
        payload => {
            getUserChatData();
        }
    );
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text>CHATS</Text>
      <ChatList chats={chatData}/>
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
