import { StyleSheet } from 'react-native';
import React, { useEffect, useCallback, useState } from "react";
import { GiftedChat } from 'react-native-gifted-chat'
import { db } from "../../firebase";
import { collection, doc, setDoc, getDocs, updateDoc } from "firebase/firestore";
import { Colors, Layout, Typography } from "../../styles";

import USER from "../../consts/user";

export default function ChatScreen({ route, navigation }) {
  const { chatData } = route.params
  const [messages, setMessages] = useState([])

  const getAllUserMessages = async () => {
    let ls = []
    const chatsRef = collection(db, `chats/${chatData.id}/messages`);
    const messages = await getDocs(chatsRef);
    messages.forEach((message) => {
      ls = [...ls, {_id: message.data()._id,
        text: message.data().text,
        user: message.data().user,
        createdAt: message.data().createdAt.toDate()}]
    });
    setMessages(ls)
  };

  const updateMessages = async (message) => {
    await setDoc(doc(db, `chats/${chatData.id}/messages`, message._id), message);
    const chatRef = doc(db, "chats", chatData.id);
    await updateDoc(chatRef, {
      latestSender: USER.name,
      latestMessage: message.text,
      latestTimestamp: new Date(message.createdAt)
    });
  }

  const onSend = useCallback((messages = []) => {
    updateMessages(messages[0])
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  useEffect(() => {
    navigation.addListener(
        'focus',
        payload => {
            getAllUserMessages();
        }
    );
  }, [])

  return (
    <GiftedChat style={styles.topContainer}
        messages={messages.sort((a, b) => b.createdAt - a.createdAt)}
        onSend={messages => onSend(messages)}
        user={{
          _id: USER.id,
          name: USER.name,
          avatar: USER.img
        }}
      />
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
  },
  container: {
    ...Layout.container,
    flex: 1,
    overflow: "hidden",
    paddingTop: 20
  },
  button: {
    ...Layout.button,
    marginVertical: 10
  },
  subheader: {
    ...Typography.subheader,
  },
  body: {
    ...Typography.body,
  },
  small: {
    ...Typography.small,
    fontSize: 12,
    lineHeight: 12,
  },
  chatwindow: {
    height: '80%',
    width: '80%',
    borderStyle: "solid",
    borderWidth:  1
  }
});
