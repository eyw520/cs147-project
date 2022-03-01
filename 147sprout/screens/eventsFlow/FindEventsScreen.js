import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

import Interests from "../../consts/interests";
import Locations from "../../consts/locations";

const SortBy = [
  {label: "Sort By: Interests", val: "Interests"},
  {label: "Sort By: Locations", val: "Locations"}
]

export default function FindEventsScreen({ route, navigation }) {
  const [sort, setSort] = useState("Interests")
  const { allEvents, userAttending, userHosting } = route.params;

  return (
    <SafeAreaView style={styles.container}>

    <Dropdown
      style = {styles.dropdown}
      data = {SortBy}
      placeholder = 'Sort By: Interests'
      labelField = "label"
      valueField = "val"
      value = {sort}
      onChange = {(item) => { setSort(item.val) }}
    />

    <Text style={{fontSize: 20}}>Sorting By</Text>
      {sort === "Interests" ?
        Interests.map((interest, idx) => {
          return <Pressable style={styles.sort} key = {idx}
            onPress={() => {navigation.navigate(interest, {
              eventList: allEvents.filter(item => item.interests.includes(interest)),
            })}}>
            <Text> {interest} </Text>
          </Pressable>
        })
        :
        Locations.map((location, idx) => {
          return <Pressable style={styles.sort} key = {idx}
            onPress={() => {navigation.navigate(location, {
              eventList: allEvents.filter(item => item.locations.includes(location)),
            })}}>
            <Text> {location} </Text>
          </Pressable>
        })
      }
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
  },
  sort: {
    borderStyle: "solid",
    borderWidth:  1
  },
  dropdown: {
    width: 300
  }
});
