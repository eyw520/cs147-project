import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EventList({ flowers }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => {navigation.navigate("View Flower", {
          flowerData: item,
        })}}>
          <View key={item.id}>
            <Text> {item.flowerName} </Text>
            <Text> {item.flowerDescription} </Text>
            <Text> {item.state} </Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={flowers}
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
