import { StyleSheet, Pressable, Text, View, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useCallback, useState } from "react";
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Colors, Layout, Typography } from "../../styles";
import * as Images from "../../assets/images/";

import GroupPosts from "../../components/GroupPosts"
import GroupMembers from "../../components/GroupMembers"

import USER from "../../consts/user";

export default function GroupInformationScreen({ route }) {
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
  }

  useEffect(() => {
    getGroupData();
  }, [])

  const renderTabSwitcher = () => {
    return (
      <View style={styles.hContainer}>
        {currTab == "POSTS" ?
          <View style={[styles.tab, styles.activeTab, styles.rightMargin]}>
            <Text style={[styles.small, styles.activeText]}>POSTS</Text>
          </View>
          :
          <Pressable style={[styles.tab, styles.rightMargin]} onPress={() => setCurrTab("POSTS")}>
            <Text style={styles.small}>Posts</Text>
          </Pressable>
        }
        {currTab == "FEED" ?
          <View style={[styles.tab, styles.activeTab, styles.rightMargin]}>
            <Text style={[styles.small, styles.activeText]}>Feed</Text>
          </View>
          :
          <Pressable style={[styles.tab, styles.rightMargin]} onPress={() => setCurrTab("FEED")}>
            <Text style={styles.small}>Feed</Text>
          </Pressable>
        }
        {currTab == "MEMBERS" ?
          <View style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.small, styles.activeText]}>Members</Text>
          </View>
          :
          <Pressable style={styles.tab} onPress={() => setCurrTab("MEMBERS")}>
            <Text style={styles.small}>Members</Text>
          </Pressable>
        }
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.tabs}>
        {renderTabSwitcher()}
      </View>

      {currTab == "FEED" &&
        <View style={styles.container}>
          <Image style={[styles.headerImage, styles.bottomMargin]} source={Images.interests[groupData.img]}/>
          <Text style={styles.body}>{groupData.groupDescription}</Text>
          {groupData.members.includes(USER.id) ?
            <Pressable style={styles.button} onPress={() => leaveGroup()}>
              <Text style={styles.body}>Leave Group</Text>
            </Pressable>
            :
            <Pressable style={styles.button} onPress={() => joinGroup()}>
              <Text style={styles.body}>Join Group</Text>
            </Pressable>
          }
          <GroupPosts posts={posts} />
        </View>
      }

      {currTab == "POSTS" &&
        <View style={styles.container}>
          <GroupPosts posts={posts} />
        </View>
      }

      {currTab == "MEMBERS" &&
        <View style={styles.container}>
          <GroupMembers members={groupData.members} />
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
    flex: 1,
    overflow: "hidden",
    paddingTop: 20
  },
  hContainer: {
    ...Layout.container,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerImage: {
    ...Layout.image,
    width: "100%",
    height: 220,
    borderRadius: 20
  },
  button: {
    ...Layout.button,
    marginVertical: 10
  },
  tab: {
    ...Layout.button,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  activeTab: {
    borderColor: Colors.green
  },
  activeText: {
    color: Colors.green
  },
  rightMargin: {
    marginRight: 10
  },
  bottomMargin: {
    marginBottom: 10
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
});
