import { StyleSheet, Button, Pressable, Image, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect, useCallback, useState } from "react";
import { db } from "../../firebase";
import { collection, doc, setDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";

import GroupPosts from "../../components/GroupPosts"
import GroupMembers from "../../components/GroupMembers"

import USER from "../../consts/user";

export default function GroupInformationScreen({ route, navigation }) {
  const { data } = route.params
  const [currTab, setCurrTab] = useState("FEED")
  const [groupData, setGroupData] = useState(data)
  const [posts, setPosts] = useState({})

  const getGroupData = async () => {
    const groupRef = doc(db, "groups", groupData.id);
    const groupSnap = await getDoc(groupRef);
    setGroupData(groupSnap.data())

    let ls = []
    const postsSnapshot = await getDocs(collection(db, `groups/${groupData.id}/posts`));
    postsSnapshot.forEach((post) => { ls = [...ls, post.data()] });
    setPosts(ls)
  }

  const joinGroup = async () => {
    const groupRef = doc(db, "groups", groupData.id);
    await updateDoc(groupRef, {
      members: [...groupData.members, USER.id]
    });
    getGroupData()
    console.log("update performed")
  }

  const leaveGroup = async () => {
    var index = groupData.members.indexOf(USER.id);
    if (index > -1) {
      groupData.members.splice(index, 1);
    }
    await updateDoc(doc(db, "groups", groupData.id), {
      members: groupData.members
    });
    getGroupData()
    console.log("update performed")
  }

  useEffect(() => {
    getGroupData();
  }, [])

  const renderTabSwitcher = () => {
    return (
      <View>
        {currTab == "POSTS" ?
          <Text style={{fontSize: 25}}> POSTS  </Text>
          :
          <Pressable onPress={() => setCurrTab("POSTS")}>
            <Text> POSTS </Text>
          </Pressable>
        }
        {currTab == "FEED" ?
          <Text style={{fontSize: 25}}> FEED </Text>
          :
          <Pressable onPress={() => setCurrTab("FEED")}>
            <Text> FEED </Text>
          </Pressable>
        }
        {currTab == "MEMBERS" ?
          <Text style={{fontSize: 25}}> MEMBERS </Text>
          :
          <Pressable onPress={() => setCurrTab("MEMBERS")}>
            <Text> MEMBERS </Text>
          </Pressable>
        }
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        {renderTabSwitcher()}
      </View>

      {currTab == "FEED" &&
        <View style={styles.container}>
          <View style={styles.container}>
            <Text> {groupData.groupDescription} </Text>
            {groupData.members.includes(USER.id) ?
              <Pressable onPress={() => leaveGroup()}>
                <Text style={{fontSize: 25}}> Leave Group </Text>
              </Pressable>
              :
              <Pressable onPress={() => joinGroup()}>
                <Text style={{fontSize: 25}}> Join Group </Text>
              </Pressable>
            }
          </View>
          <View style={styles.container}>
            <GroupPosts posts={posts} />
          </View>
        </View>
      }

      {currTab == "POSTS" &&
        <View style={styles.container}>
          <View style={styles.container}>
            <GroupPosts posts={posts} />
          </View>
        </View>
      }

      {currTab == "MEMBERS" &&
        <View style={styles.container}>
          <View style={styles.container}>
            <GroupMembers members={groupData.members} />
          </View>
        </View>
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginBottom: 25
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  }
});
