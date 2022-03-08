import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Layout, Typography } from "../styles";
import * as Images from "../assets/images/";

export default function EventList({ events }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => {navigation.navigate("Event Information", {
          eventData: item,
        })}}>
          <View key={item.id} style={styles.event}>
            <Image style={styles.image} source={Images.events[item.id]} />
            <View style={styles.details}>
              <Text numberOfLines={1} style={styles.small}>{item.eventStart}</Text>
              <Text numberOfLines={1} style={styles.subheader}>{item.eventName}</Text>
              <Text numberOfLines={1} style={styles.body}>{item.eventAddress}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.topContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={events}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  container: {
    ...Layout.container,
    marginVertical: 5,
    height: 55,
    overflow: "hidden"
  },
  event: {
    ...Layout.container,
    flexDirection: "row",
  },
  image: {
    ...Layout.image,
    width: 82.5,
    height: 55,
    borderRadius: 10,
    marginRight: 10
  },
  details: {
    flex: 1
  },
  body: {
    ...Typography.body,
    lineHeight: 20
  },
  subheader: {
    ...Typography.subheader,
    lineHeight: 20
  },
  small: {
    ...Typography.smallBody,
    lineHeight: 15,
    textTransform: "uppercase"
  }
});
