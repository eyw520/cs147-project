import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProfileScreen({ route, navigation }) {
  const [userData, setUserData] = useState({})
  const [userInterests, setUserInterests] = useState([])
  const [userLocations, setUserLocations] = useState([])
  const [userSkills, setUserSkills] = useState([])

  const getProfile = async () => {
    const profileRef = doc(db, "users", "user1");
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      let data = profileSnap.data()
      setUserData(data)
      setUserInterests(data.interests)
      setUserLocations(data.locations)
      setUserSkills(data.skills)
    } else {
      console.log("error retrieving user profile.")
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
          return <Text> {idx}: {interest} </Text>
        })
        }
      </View>

      <View style={styles.container}>
        <Text> USER SKILLS </Text>
        {userSkills.map((interest, idx) => {
          return <Text> {idx}: {interest} </Text>
        })
        }
      </View>

      <View style={styles.container}>
        <Text> LOCATIONS </Text>
        {userLocations.map((location, idx) => {
          return <Text> {idx}: {location} </Text>
        })
        }
      </View>
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
