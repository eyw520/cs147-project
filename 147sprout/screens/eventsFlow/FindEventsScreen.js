import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from "react";
import { Colors, Layout, Typography } from "../../styles";

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
    <SafeAreaView style={styles.topContainer}>

      <View style={styles.container}>
        <Dropdown
          style = {[styles.button, styles.sort]}
          placeholderStyle = {styles.sortText}
          selectedTextStyle = {styles.sortText}
          data = {SortBy}
          placeholder = 'Sort By: Interests'
          labelField = "label"
          valueField = "val"
          value = {sort}
          onChange = {(item) => { setSort(item.val) }}
        />
      </View>

      <View style={styles.tagsContainer}>
      {sort === "Interests" ?
        INTERESTS.map((interest) => {
          return <Pressable style={styles.button} key = {interest.key}
            onPress={() => {navigation.navigate(interest.val, {
              eventList: allEvents.filter(item => item.interests.includes(interest.val) && item.status === "live"),
              title: interest.val
            })}}>
            <Text style={styles.body}>{interest.val}</Text>
          </Pressable>
        })
        :
        LOCATIONS.map((location) => {
          return <Pressable style={styles.button} key = {location.key}
            onPress={() => {navigation.navigate(location.val, {
              eventList: allEvents.filter(item => item.locations.includes(location.val) && item.status === "live"),
              title: location.val
            })}}>
            <Text style={styles.body}>{location.val}</Text>
          </Pressable>
        })
      }
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
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  tagsContainer: {
    ...Layout.container,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10
  },
  sort: {
    paddingVertical: 0,
    width: 200,
  },
  sortText: {
    ...Typography.body,
    color: Colors.gray,
    fontSize: 12,
    lineHeight: 18
  },
  button: {
    ...Layout.button,
    marginRight: 10,
    marginBottom: 10
  },
  subheader: {
    ...Typography.subheader
  },
  body: {
    ...Typography.body
  }
});
