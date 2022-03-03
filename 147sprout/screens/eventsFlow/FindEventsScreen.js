import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from "react";

import INTERESTS from "../../consts/interests";
import LOCATIONS from "../../consts/locations";

const SortBy = [
  {label: "Sort By: Interests", val: "Interests"},
  {label: "Sort By: Locations", val: "Locations"}
]

export default function FindEventsScreen({ route, navigation }) {
  const [sort, setSort] = useState("Interests")
  const { allEvents } = route.params;

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
        INTERESTS.map((interest) => {
          return <Pressable style={styles.sort} key = {interest.key}
            onPress={() => {navigation.navigate(interest.val, {
              eventList: allEvents.filter(item => item.interests.includes(interest.val) && item.status === "live"),
              title: interest.val
            })}}>
            <Text> {interest.val} </Text>
          </Pressable>
        })
        :
        LOCATIONS.map((location) => {
          return <Pressable style={styles.sort} key = {location.key}
            onPress={() => {navigation.navigate(location.val, {
              eventList: allEvents.filter(item => item.locations.includes(location.val) && item.status === "live"),
              title: location.val
            })}}>
            <Text> {location.val} </Text>
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
    width: '80%',
    borderStyle: "solid",
    borderWidth:  1
  }
});
