import { StyleSheet, Text, View, Pressable, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { db } from "../../firebase";
import { collection, doc, getDoc, setDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Layout, Typography } from "../../styles";
import * as Images from "../../assets/images/";

import USER from "../../consts/user";

export default function ViewProfileScreen({ route, navigation }) {
  const [isFriend, setIsFriend] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const { userData } = route.params

  const addFriend = async () => {
    const userRef = doc(db, "users", userData.id);
    const userSnap = await getDoc(userRef)
    if (!userSnap.data().friends.includes(USER.id)) {
      await updateDoc(userRef, {
        friends: [...userSnap.data().friends, USER.id]
      });
    }
    const selfRef = doc(db, "users", USER.id);
    const selfSnap = await getDoc(selfRef)
    if (!selfSnap.data().friends.includes(userData.id)) {
      await updateDoc(selfRef, {
        friends: [...selfSnap.data().friends, userData.id]
      });
    }
    setIsFriend(true)
  }

  const removeFriend = async () => {
    const selfRef = doc(db, "users", USER.id);
    const selfSnap = await getDoc(selfRef)
    const selfData = selfSnap.data()
    let index1 = selfData.friends.indexOf(userData.id);
    if (index1 > -1) {
      selfData.friends.splice(index1, 1)
      await updateDoc(doc(db, "users", USER.id), {
        friends: selfData.friends
      });
    }
    const userRef = doc(db, "users", userData.id);
    let index2 = userData.friends.indexOf(USER.id);
    if (index1 > -1) {
      userData.friends.splice(index2, 1)
      await updateDoc(doc(db, "users", userData.id), {
        friends: userData.friends.splice(index2, 1)
      });
    }
    setIsFriend(false)
  }

  const chatUser = async () => {
    let ls = []
    let ct = 0
    const chatsRef = collection(db, "chats");
    let memberKey = [USER.id, userData.id]
    memberKey.sort((a, b) => b < a)
    const q = query(chatsRef, where("members", "==", memberKey));
    const queryResults = await getDocs(q);
    queryResults.forEach((doc) => {
      ct += 1
    })
    if (ct === 0) {
      const querySnapshot = await getDocs(collection(db, "chats"));
      let currId = `chat${querySnapshot.size}`
      await setDoc(doc(db, "chats", currId), {
        id: currId,
        members: [USER.id, userData.id],
        latestMessage: "",
        latestSender: "",
        latestTimestamp: new Date(Date.now()),
        chatName: ""
      });
    }
    setModalVisible(true)
  }

  useEffect(() => {
    setIsFriend(userData.friends.includes(USER.id));
  }, []);

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.hContainer}>
        <View style={styles.left}>
          <Image style={styles.image} source={Images.profiles[userData.img]} />
        </View>
        <View style={styles.container}>

          {isFriend ?
            <Pressable style={[styles.button, styles.tag]} onPress={() => removeFriend()}>
              <Text style={styles.body}>Remove Friend</Text>
            </Pressable>
            :
            <Pressable style={[styles.button, styles.tag]} onPress={() => addFriend()}>
              <Text style={styles.body}>Add Friend</Text>
            </Pressable>
          }

          <Pressable
            style={[styles.button, styles.tag]}
            onPress={() => navigation.navigate("View User Groups", {
              userGroups: userData.groups,
            })}>
            <Text style={styles.body}>Groups</Text>
          </Pressable>

          <Pressable style={[styles.button, styles.tag]} onPress={() => chatUser()}>
            <Text style={styles.body}>Chat</Text>
          </Pressable>

        </View>
      </View>

      <View style={styles.hLine} />

      <View style={styles.hContainer}>
        <View style={styles.left}>
          <Text style={styles.details}>username</Text>
          <Text style={styles.details}>name</Text>
          <Text style={styles.details}>pronouns</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.body}>{userData.username}</Text>
          <Text style={styles.body}>{userData.name}</Text>
          <Text style={styles.body}>{userData.pronouns}</Text>
        </View>
      </View>

      <View style={styles.hLine} />

      <View style={styles.container}>
        <Text style={styles.subheader}>Interests</Text>
        <View style={styles.tagsContainer}>
          {userData.interests.map((interest, idx) => {
            return <Text style={[styles.tag, styles.body]} key={idx}>{interest}</Text>
          })}
        </View>
      </View>

      <View style={styles.hLine} />

      <View style={styles.container}>
        <Text style={styles.subheader}>Skills</Text>
        <View style={styles.tagsContainer}>
          {userData.skills.map((skill, idx) => {
            return <Text style={[styles.tag, styles.body]} key={idx}>{skill}</Text>
          })}
        </View>
      </View>

      <View style={styles.hLine} />

      <View style={styles.container}>
        <Text style={styles.subheader}>Regions</Text>
        <View style={styles.tagsContainer}>
          {userData.locations.map((location, idx) => {
            return <Text style={[styles.tag, styles.body]} key={idx}>{location}</Text>
          })}
        </View>
      </View>

      <Modal isVisible={modalVisible}>
        <View style={styles.modal}>

          <Text style={styles.subheader}>Your chat exists or has been created!</Text>
          <Text style={styles.body}>You can access the conversation through the 'Social' tab.</Text>
          <Pressable
            style={styles.close}
            onPress={() => (
              setModalVisible(false)
            )}
          >
            <Text style={styles.body}>Close</Text>
          </Pressable>

        </View>
      </Modal>
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
  modal: {
    ...Layout.modal,
    paddingVertical: 30
  },
  hContainer: {
    ...Layout.container,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  tagsContainer: {
    ...Layout.container,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  hLine: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10
  },
  image: {
    ...Layout.image,
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 5
  },
  left: {
    marginRight: 20
  },
  right: {
    flex: 1
  },
  subheader: {
    ...Typography.subheader,
  },
  body: {
    ...Typography.body,
  },
  details: {
    ...Typography.small,
    fontSize: 10,
    lineHeight: 20,
  },
  small: {
    ...Typography.small,
  },
  tag: {
    ...Layout.button,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: 160
  },
  close: {
    ...Layout.button,
    marginTop: 20
  }
});
