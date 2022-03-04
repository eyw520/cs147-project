import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Colors, Layout, Typography } from "../../styles";

import USER from "../../consts/user";

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({})
  const [userInterests, setUserInterests] = useState([])
  const [userLocations, setUserLocations] = useState([])
  const [userSkills, setUserSkills] = useState([])
  const [userFriends, setUserFriends] = useState([])

  const getProfile = async () => {
    const profileRef = doc(db, "users", USER.id);
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      let data = profileSnap.data()
      setUserData(data)
      setUserInterests(data.interests)
      setUserLocations(data.locations)
      setUserSkills(data.skills)
      setUserFriends(data.friends)
    }
  };

  useEffect(() => {
    getProfile();
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
        {userInterests.map((interest, idx) => {
          return <Text key={idx}> {idx}: {interest} </Text>
        })}
      </View>

      <View style={styles.container}>
        <Text> USER SKILLS </Text>
        {userSkills.map((skill, idx) => {
          return <Text key={idx}>  {idx}: {skill} </Text>
        })}
      </View>

      <View style={styles.container}>
        <Text> LOCATIONS </Text>
        {userLocations.map((location, idx) => {
          return <Text key={idx}> {idx}: {location} </Text>
        })}
      </View>

      <Pressable onPress={() => {navigation.navigate("Your Friends", {
        friends: userFriends
      })}}>
        <Text>
          Your Friends
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Layout.container,
    backgroundColor: Colors.white
  },
});
