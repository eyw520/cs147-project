import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Layout, Typography } from "../styles";

export default function EventList({ events }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => {navigation.navigate("Event Information", {
          eventData: item,
        })}}>
          <View key={item.id}>
            <Text style={styles.subheader}>{item.eventName}, {item.eventAddress}</Text>
            <Text style={styles.body}>{item.eventDescription}</Text>
            <Text style={styles.small}>{item.eventStart}, {item.eventEnd}</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={events}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Layout.container,
  },
  body: {
    ...Typography.smallBody
  },
  subheader: {
    ...Typography.smallBody,
    fontWeight: "600"
  },
  small: {
    ...Typography.small
  }
});
