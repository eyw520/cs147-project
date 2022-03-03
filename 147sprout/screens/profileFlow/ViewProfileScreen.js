import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { db } from "../../firebase";
import { collection, doc, getDoc, setDoc, getDocs, query, where, updateDoc } from "firebase/firestore";

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
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text> USER DETAILS </Text>
        <Text> username: {userData.username} </Text>
        <Text> name: {userData.name} </Text>
        <Text> pronouns: {userData.pronouns} </Text>
      </View>

      <View style={styles.container}>
        <Text> USER INTERESTS </Text>
        {userData.interests.map((interest, idx) => {
          return <Text key={idx}> {idx}: {interest} </Text>
        })}
      </View>

      <View style={styles.container}>
        <Text> USER SKILLS </Text>
        {userData.skills.map((skill, idx) => {
          return <Text key={idx}>  {idx}: {skill} </Text>
        })}
      </View>

      <View style={styles.container}>
        <Text> LOCATIONS </Text>
        {userData.locations.map((location, idx) => {
          return <Text key={idx}> {idx}: {location} </Text>
        })}
      </View>

      {isFriend ?
        <Pressable onPress={() => removeFriend()}>
          <Text>
            Remove Friend
          </Text>
        </Pressable>
        :
        <Pressable onPress={() => addFriend()}>
          <Text>
            Add Friend
          </Text>
        </Pressable>
      }
      <Pressable onPress={() => navigation.navigate("View User Groups", {
        userGroups: userData.groups,
      })}>
        <Text>
          View Friend's Groups
        </Text>
      </Pressable>

      <Pressable onPress={() => chatUser()}>
        <Text>
          Chat
        </Text>
      </Pressable>

      <Modal
        style={{ alignItems: "center" }}
        isVisible={modalVisible}
      >
        <View style={{ alignItems: "center", height: 150, width: 300, backgroundColor: "white" }}>

          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Your chat exists or has been created!
          </Text>
          <Text>
            You can access the conversation through the social tab.
          </Text>
          <Pressable onPress={() => (
            setModalVisible(false)
          )}>
            <Text>
              Click here to exit.
            </Text>
          </Pressable>

        </View>
      </Modal>
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
