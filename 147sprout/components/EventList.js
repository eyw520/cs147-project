import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EventList({ events }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => {navigation.navigate("Event Information", {
          eventData: item,
        })}}>
          <View key={item.id}>
            <Text> {item.eventName} </Text>
            <Text> {item.eventDescription} </Text>
            <Text> {item.eventStart}, {item.eventEnd} </Text>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderStyle: "solid",
    borderWidth:  1
  },
});
