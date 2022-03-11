import { StyleSheet, Text, View, Pressable, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Layout, Typography } from "../../styles";
import * as Images from "../../assets/images/";

import USER from "../../consts/user";

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({})
  const [userInterests, setUserInterests] = useState([])
  const [userLocations, setUserLocations] = useState([])
  const [userSkills, setUserSkills] = useState([])
  const [userFriends, setUserFriends] = useState([])
  const [userGroups, setUserGroups] = useState([])

  const getProfile = async () => {
    const profileRef = doc(db, "users", USER.id);
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      let data = profileSnap.data()
      setUserData(data)
      setUserInterests(data.interests)
      setUserLocations(data.locations)
      setUserSkills(data.skills)
      setUserGroups(data.groups)
      setUserFriends(data.friends)
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.hContainer}>
        <View style={styles.left}>
          <Image style={styles.image} source={Images.profiles[userData.img]} />
          <Text style={styles.small}>Change Profile Picture</Text>
        </View>
        <View style={styles.container}>
          <Pressable
            style={[styles.button, styles.tag]}
            onPress={() => {navigation.navigate("Your Friends", {
              friends: userFriends
            })}}>
            <Text style={styles.body}>Your Friends</Text>
          </Pressable>
          <Pressable
            onPress={() => {navigation.navigate("Your Groups", {
              groups: userGroups
            })}}>
            <Text style={[styles.button, styles.body, styles.tag]}>Groups</Text>
          </Pressable>
          <View style={[styles.button, styles.tag]}>
            <FontAwesome5 style={{marginRight: 5}} name="lock" size={12} color={Colors.black} />
            <Text style={styles.body}>Make Public</Text>
          </View>
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
          {userInterests.map((interest, idx) => {
            return <Text style={[styles.tag, styles.body]} key={idx}>{interest}</Text>
          })}
        </View>
      </View>

      <View style={styles.hLine} />

      <View style={styles.container}>
        <Text style={styles.subheader}>Skills</Text>
        <View style={styles.tagsContainer}>
          {userSkills.map((skill, idx) => {
            return <Text style={[styles.tag, styles.body]} key={idx}>{skill}</Text>
          })}
        </View>
      </View>

      <View style={styles.hLine} />

      <View style={styles.container}>
        <Text style={styles.subheader}>Regions</Text>
        <View style={styles.tagsContainer}>
          {userLocations.map((location, idx) => {
            return <Text style={[styles.tag, styles.body]} key={idx}>{location}</Text>
          })}
        </View>
      </View>

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
    width: 105,
    height: 105,
    borderRadius: 52.5,
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
  }
});
